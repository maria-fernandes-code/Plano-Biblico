// Import dependencies
import { devotionalContent } from './devotional-data.js';
import { defaultConfig } from '../config/default-config.js';
import { formatDate, getDateString, showMessage } from './utils.js';

// Global state
let currentDate = new Date();
let currentView = 'today';
let userProgress = [];
let currentCalendarMonth = new Date(2026, 0, 1);
let isLoading = false;

// Data SDK handler
const dataHandler = {
    onDataChanged(data) {
        userProgress = data;
        updateProgressDisplay();
        updateTodayView();
        if (currentView === 'calendar') {
            renderCalendar();
        } else if (currentView === 'favorites') {
            renderFavorites();
        } else if (currentView === 'progress') {
            renderProgress();
        }
    }
};

// Element SDK functions
async function onConfigChange(config) {
    const appTitle = config.app_title || defaultConfig.app_title;
    const welcomeMessage = config.welcome_message || defaultConfig.welcome_message;
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
    const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const fontSize = config.font_size || defaultConfig.font_size;

    // Update text content
    document.getElementById('app-title').textContent = appTitle;
    document.getElementById('welcome-message').textContent = welcomeMessage;

    // Update colors
    document.body.style.background = `linear-gradient(to bottom right, ${backgroundColor}, ${primaryColor}20)`;
    
    const surfaces = document.querySelectorAll('.bg-white');
    surfaces.forEach(el => el.style.backgroundColor = surfaceColor);
    
    const textElements = document.querySelectorAll('.text-gray-800, .text-gray-700');
    textElements.forEach(el => el.style.color = textColor);
    
    const primaryButtons = document.querySelectorAll('.bg-indigo-600');
    primaryButtons.forEach(el => {
        el.style.backgroundColor = primaryColor;
        el.style.borderColor = primaryColor;
    });
    
    const secondaryButtons = document.querySelectorAll('.text-indigo-600');
    secondaryButtons.forEach(el => {
        el.style.color = secondaryColor;
        el.style.borderColor = secondaryColor;
    });

    // Update fonts
    const fontStack = `${fontFamily}, system-ui, sans-serif`;
    document.body.style.fontFamily = fontStack;
    
    // Update font sizes proportionally
    document.getElementById('app-title').style.fontSize = `${fontSize * 2.5}px`;
    document.getElementById('welcome-message').style.fontSize = `${fontSize * 1.125}px`;
    document.querySelectorAll('h2').forEach(el => el.style.fontSize = `${fontSize * 1.5}px`);
    document.querySelectorAll('h3').forEach(el => el.style.fontSize = `${fontSize * 1.25}px`);
    document.querySelectorAll('p, div, span, button, input, textarea').forEach(el => {
        if (!el.style.fontSize) el.style.fontSize = `${fontSize}px`;
    });
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ background_color: value });
                    }
                }
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ surface_color: value });
                    }
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            },
            {
                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ primary_action_color: value });
                    }
                }
            },
            {
                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ secondary_action_color: value });
                    }
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                if (window.elementSdk) {
                    window.elementSdk.setConfig({ font_family: value });
                }
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                if (window.elementSdk) {
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["app_title", config.app_title || defaultConfig.app_title],
        ["welcome_message", config.welcome_message || defaultConfig.welcome_message]
    ]);
}

function getUserProgress(dateStr) {
    return userProgress.find(p => p.date === dateStr);
}

async function saveProgress(dateStr, data) {
    if (isLoading) return;
    
    const existing = getUserProgress(dateStr);
    const progressData = {
        date: dateStr,
        completed: data.completed || false,
        notes: data.notes || '',
        favorite: data.favorite || false,
        personal_prayer_request: data.personal_prayer_request || '',
        forgiveness_reflection: data.forgiveness_reflection || ''
    };

    isLoading = true;
    
    try {
        if (existing) {
            const updatedData = { ...existing, ...progressData };
            const result = await window.dataSdk.update(updatedData);
            if (!result.isOk) {
                showMessage('Erro ao salvar progresso', 'error');
            }
        } else {
            if (userProgress.length >= 999) {
                showMessage('Limite máximo de 999 registros atingido. Exclua alguns registros primeiro.', 'error');
                return;
            }
            const result = await window.dataSdk.create(progressData);
            if (!result.isOk) {
                showMessage('Erro ao salvar progresso', 'error');
            }
        }
    } catch (error) {
        showMessage('Erro ao salvar dados', 'error');
    } finally {
        isLoading = false;
    }
}

// View functions
function showView(viewName) {
    const views = ['today-view', 'calendar-view', 'favorites-view', 'progress-view'];
    views.forEach(view => {
        const element = document.getElementById(view);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('fade-in');
    }
    
    currentView = viewName;
    
    // Update button states
    const buttons = document.querySelectorAll('button[id$="-btn"]');
    buttons.forEach(btn => {
        if (btn.id === `${viewName}-btn`) {
            btn.className = 'bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors';
        } else if (['today-btn', 'calendar-btn', 'favorites-btn', 'progress-btn'].includes(btn.id)) {
            btn.className = 'bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-lg font-medium transition-colors';
        }
    });
}

function updateTodayView() {
    const dateStr = getDateString(currentDate);
    const content = devotionalContent[dateStr];
    const progress = getUserProgress(dateStr);
    
    if (content) {
        document.getElementById('today-date').textContent = formatDate(currentDate);
        document.getElementById('today-verse-ref').textContent = content.reference;
        document.getElementById('today-verse').textContent = `"${content.verse}"`;
        document.getElementById('today-reflection').innerHTML = content.reflection.split('. ').map(sentence => 
            sentence.trim() ? `<p>${sentence.trim()}${sentence.endsWith('.') ? '' : '.'}</p>` : ''
        ).join('');
        document.getElementById('today-prayer').textContent = content.prayer;
        document.getElementById('today-prayer-request').textContent = content.prayerRequest;
        document.getElementById('today-forgiveness').textContent = content.forgiveness;
        
        // Update user data
        const notesInput = document.getElementById('notes-input');
        notesInput.value = progress?.notes || '';
        
        const prayerRequestInput = document.getElementById('personal-prayer-request');
        prayerRequestInput.value = progress?.personal_prayer_request || '';
        
        const forgivenessInput = document.getElementById('forgiveness-reflection');
        forgivenessInput.value = progress?.forgiveness_reflection || '';
        
        const completeBtn = document.getElementById('mark-complete-btn');
        if (progress?.completed) {
            completeBtn.textContent = '✓ Lido';
            completeBtn.className = 'bg-green-700 text-white px-6 py-2 rounded-lg font-medium cursor-default';
        } else {
            completeBtn.textContent = '✓ Marcar como Lido';
            completeBtn.className = 'bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors';
        }
        
        const favoriteBtn = document.getElementById('favorite-btn');
        favoriteBtn.textContent = progress?.favorite ? '⭐' : '☆';
        favoriteBtn.style.color = progress?.favorite ? '#fbbf24' : '#9ca3af';
    }
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthName = currentCalendarMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    document.getElementById('current-month').textContent = monthName;
    
    grid.innerHTML = '';
    
    // Days of week headers
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'text-center font-semibold text-gray-600 p-2';
        header.textContent = day;
        grid.appendChild(header);
    });
    
    // Calendar days
    const firstDay = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth(), 1);
    const lastDay = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'p-2 text-center cursor-pointer rounded-lg transition-colors hover:bg-indigo-100';
        
        if (date.getMonth() !== currentCalendarMonth.getMonth()) {
            dayElement.className += ' text-gray-400';
        } else {
            const dateStr = getDateString(date);
            const progress = getUserProgress(dateStr);
            
            if (progress?.completed) {
                dayElement.className += ' bg-green-100 text-green-800 font-semibold';
            } else if (progress?.favorite) {
                dayElement.className += ' bg-yellow-100 text-yellow-800';
            }
            
            if (dateStr === getDateString(new Date())) {
                dayElement.className += ' ring-2 ring-indigo-500';
            }
        }
        
        dayElement.textContent = date.getDate();
        dayElement.addEventListener('click', () => {
            if (date.getMonth() === currentCalendarMonth.getMonth()) {
                currentDate = new Date(date);
                updateTodayView();
                showView('today');
            }
        });
        
        grid.appendChild(dayElement);
    }
}

function renderFavorites() {
    const container = document.getElementById('favorites-list');
    const favorites = userProgress.filter(p => p.favorite);
    
    if (favorites.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum devocional favorito ainda. Marque seus favoritos com ⭐</p>';
        return;
    }
    
    container.innerHTML = favorites.map(fav => {
        const date = new Date(fav.date);
        const content = devotionalContent[fav.date];
        return `
            <div class="devotional-card border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md" 
                 onclick="goToDate('${fav.date}')">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-gray-800">${formatDate(date)}</h3>
                    <span class="text-yellow-500">⭐</span>
                </div>
                <p class="text-sm text-indigo-600 mb-2">${content?.reference || ''}</p>
                <p class="text-gray-600 text-sm line-clamp-2">${content?.verse || ''}</p>
                ${fav.notes ? `<p class="text-xs text-gray-500 mt-2 italic">"${fav.notes}"</p>` : ''}
            </div>
        `;
    }).join('');
}

function renderProgress() {
    const completedCount = userProgress.filter(p => p.completed).length;
    document.getElementById('completed-count').textContent = completedCount;
    
    // Calculate streak
    let streak = 0;
    const today = new Date();
    let checkDate = new Date(today);
    
    while (true) {
        const dateStr = getDateString(checkDate);
        const progress = getUserProgress(dateStr);
        if (progress?.completed) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    document.getElementById('streak-count').textContent = streak;
    
    // Monthly progress
    const monthlyContainer = document.getElementById('monthly-progress');
    const monthlyStats = {};
    
    userProgress.forEach(p => {
        const date = new Date(p.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        if (!monthlyStats[monthKey]) {
            monthlyStats[monthKey] = { completed: 0, total: 0 };
        }
        monthlyStats[monthKey].total++;
        if (p.completed) monthlyStats[monthKey].completed++;
    });
    
    monthlyContainer.innerHTML = Object.entries(monthlyStats).map(([monthKey, stats]) => {
        const [year, month] = monthKey.split('-');
        const monthName = new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        const percentage = Math.round((stats.completed / stats.total) * 100);
        
        return `
            <div class="flex justify-between items-center">
                <span class="font-medium">${monthName}</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${percentage}%"></div>
                    </div>
                    <span class="text-sm text-gray-600">${stats.completed}/${stats.total}</span>
                </div>
            </div>
        `;
    }).join('');
}

function updateProgressDisplay() {
    // This function is called when data changes to update any progress indicators
    if (currentView === 'progress') {
        renderProgress();
    }
}

function goToDate(dateStr) {
    currentDate = new Date(dateStr);
    updateTodayView();
    showView('today');
}

// Make goToDate available globally for onclick handlers
window.goToDate = goToDate;

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize SDKs
    if (window.dataSdk) {
        const initResult = await window.dataSdk.init(dataHandler);
        if (!initResult.isOk) {
            console.error('Failed to initialize data SDK');
        }
    }

    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }

    // Set current date to today or January 1, 2026 if we're not in 2026
    const today = new Date();
    if (today.getFullYear() === 2026) {
        currentDate = today;
    } else {
        currentDate = new Date(2026, 0, 1);
    }

    updateTodayView();

    // Navigation buttons
    document.getElementById('today-btn').addEventListener('click', () => showView('today'));
    document.getElementById('calendar-btn').addEventListener('click', () => {
        showView('calendar');
        renderCalendar();
    });
    document.getElementById('favorites-btn').addEventListener('click', () => {
        showView('favorites');
        renderFavorites();
    });
    document.getElementById('progress-btn').addEventListener('click', () => {
        showView('progress');
        renderProgress();
    });

    // Today view controls
    document.getElementById('mark-complete-btn').addEventListener('click', async () => {
        const dateStr = getDateString(currentDate);
        const progress = getUserProgress(dateStr);
        
        if (!progress?.completed) {
            await saveProgress(dateStr, { completed: true });
            showMessage('Devocional marcado como lido!');
        }
    });

    document.getElementById('favorite-btn').addEventListener('click', async () => {
        const dateStr = getDateString(currentDate);
        const progress = getUserProgress(dateStr);
        const newFavoriteState = !progress?.favorite;
        
        await saveProgress(dateStr, { favorite: newFavoriteState });
        showMessage(newFavoriteState ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
    });

    document.getElementById('notes-input').addEventListener('blur', async () => {
        const dateStr = getDateString(currentDate);
        const notes = document.getElementById('notes-input').value;
        await saveProgress(dateStr, { notes });
    });

    document.getElementById('personal-prayer-request').addEventListener('blur', async () => {
        const dateStr = getDateString(currentDate);
        const personal_prayer_request = document.getElementById('personal-prayer-request').value;
        await saveProgress(dateStr, { personal_prayer_request });
    });

    document.getElementById('forgiveness-reflection').addEventListener('blur', async () => {
        const dateStr = getDateString(currentDate);
        const forgiveness_reflection = document.getElementById('forgiveness-reflection').value;
        await saveProgress(dateStr, { forgiveness_reflection });
    });

    document.getElementById('prev-day-btn').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateTodayView();
    });

    document.getElementById('next-day-btn').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateTodayView();
    });

    // Calendar controls
    document.getElementById('prev-month-btn').addEventListener('click', () => {
        currentCalendarMonth.setMonth(currentCalendarMonth.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month-btn').addEventListener('click', () => {
        currentCalendarMonth.setMonth(currentCalendarMonth.getMonth() + 1);
        renderCalendar();
    });
});

