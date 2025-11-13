// Devotional content for 2026
export const devotionalContent = {
    "2026-01-01": {
        verse: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
        reference: "Jeremias 29:11",
        reflection: "Começamos um novo ano com a certeza de que Deus tem planos maravilhosos para nós. Não importa o que o ano passado trouxe, hoje é um novo começo. Deus conhece cada detalhe do nosso futuro e Seus planos são sempre de bem e não de mal. Que possamos confiar em Sua direção e caminhar com fé neste novo ano.",
        prayer: "Senhor, obrigado por este novo ano que se inicia. Ajuda-me a confiar em Teus planos e a caminhar em Tua vontade. Que eu possa crescer espiritualmente e ser uma bênção para outros. Em nome de Jesus, amém.",
        prayerRequest: "Ore por sabedoria para tomar decisões corretas neste novo ano. Peça a Deus que abençoe seus planos e projetos, e que Ele use você para impactar positivamente a vida de outras pessoas.",
        forgiveness: "Neste início de ano, é tempo de deixar para trás mágoas e ressentimentos. Perdoe aqueles que te feriram no passado e peça perdão por suas próprias falhas. Deus nos oferece um recomeço limpo."
    },
    "2026-01-02": {
        verse: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
        reference: "Provérbios 3:5",
        reflection: "A confiança em Deus vai além do nosso entendimento limitado. Muitas vezes queremos compreender todos os detalhes antes de dar um passo, mas Deus nos chama para confiar Nele mesmo quando não entendemos o caminho. Nossa sabedoria é limitada, mas a de Deus é perfeita e infinita.",
        prayer: "Pai celestial, ajuda-me a confiar em Ti de todo o meu coração. Quando as circunstâncias parecerem confusas, lembra-me de que Tua sabedoria é maior que a minha. Guia meus passos hoje. Amém.",
        prayerRequest: "Peça a Deus discernimento para as decisões que precisa tomar. Ore por confiança para seguir Sua direção mesmo quando o caminho não estiver claro. Interceda por aqueles que estão enfrentando momentos de incerteza.",
        forgiveness: "Reconheça diante de Deus as vezes que confiou mais em sua própria sabedoria do que Nele. Perdoe-se por decisões passadas que não deram certo e confie que Deus pode usar até mesmo nossos erros para o bem."
    },
    "2026-01-03": {
        verse: "Tudo posso naquele que me fortalece.",
        reference: "Filipenses 4:13",
        reflection: "Esta não é uma promessa de que podemos fazer qualquer coisa que desejamos, mas sim que Cristo nos dá força para enfrentar qualquer situação que Ele permite em nossas vidas. Seja na abundância ou na escassez, na alegria ou na dificuldade, Cristo é nossa fonte de força e capacitação.",
        prayer: "Jesus, obrigado por ser minha fonte de força. Quando me sentir fraco ou incapaz, lembra-me de que posso todas as coisas através de Ti. Fortalece-me para os desafios de hoje. Amém.",
        prayerRequest: "Ore por força para enfrentar os desafios que estão diante de você. Peça a Deus que fortaleça aqueles que estão passando por dificuldades. Interceda por coragem para testemunhar do amor de Cristo.",
        forgiveness: "Perdoe aqueles que duvidaram de sua capacidade ou te desencorajaram. Peça perdão por momentos em que você desanimou outros ou não acreditou no poder de Deus em sua vida."
    }
};

// Generate devotional content for the entire year 2026
export function generateYearContent() {
    const verses = [
        { text: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1" },
        { text: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.", ref: "Salmos 37:5" },
        { text: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.", ref: "Mateus 6:21" },
        { text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", ref: "Mateus 11:28" },
        { text: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.", ref: "Romanos 8:28" },
        { text: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.", ref: "Efésios 2:8" },
        { text: "Posso todas as coisas em Cristo que me fortalece.", ref: "Filipenses 4:13" },
        { text: "Mas os que esperam no Senhor renovarão as suas forças.", ref: "Isaías 40:31" },
        { text: "O Senhor é bom, uma fortaleza no dia da angústia.", ref: "Naum 1:7" },
        { text: "Porque eu sou o Senhor, teu Deus, que te toma pela tua mão direita.", ref: "Isaías 41:13" }
    ];

    const reflectionTemplates = [
        "A Palavra de Deus hoje nos lembra da importância de confiar em Sua providência. Mesmo quando não compreendemos os caminhos do Senhor, podemos descansar na certeza de que Ele cuida de nós com amor perfeito.",
        "Este versículo nos convida à reflexão sobre nossa dependência de Deus. Em um mundo que valoriza a autossuficiência, somos chamados a reconhecer nossa necessidade do Criador e a buscar Sua direção em todas as áreas da vida.",
        "A promessa contida nestas palavras nos traz esperança e encorajamento. Deus não nos abandona nas dificuldades, mas caminha conosco, oferecendo Sua força e sabedoria para cada situação que enfrentamos.",
        "Hoje somos desafiados a viver de acordo com os princípios do Reino de Deus. Isso significa colocar nossa fé em prática através de ações concretas de amor, perdão e serviço ao próximo.",
        "A graça de Deus se manifesta de maneiras surpreendentes em nossa vida diária. Que possamos ter olhos para reconhecer Sua bondade e corações gratos por todas as bênçãos que recebemos."
    ];

    const prayerTemplates = [
        "Senhor, obrigado por Tua Palavra que ilumina meu caminho. Ajuda-me a aplicar estes ensinamentos em minha vida diária e a crescer em meu relacionamento contigo. Em nome de Jesus, amém.",
        "Pai celestial, que eu possa ser um reflexo do Teu amor neste mundo. Usa-me como instrumento de Tua paz e que minha vida glorifique Teu santo nome. Amém.",
        "Deus de amor, fortalece minha fé e ajuda-me a confiar em Ti em todas as circunstâncias. Que eu possa ser uma bênção para outros hoje. Em Cristo Jesus, amém.",
        "Senhor Jesus, obrigado por Teu sacrifício na cruz. Que eu possa viver de forma digna desta salvação e compartilhar Teu amor com todos ao meu redor. Amém.",
        "Espírito Santo, guia-me em toda verdade e ajuda-me a discernir Tua vontade. Que meus pensamentos, palavras e ações sejam agradáveis a Ti. Amém."
    ];

    const prayerRequestTemplates = [
        "Ore por sabedoria nas decisões importantes de sua vida. Peça a Deus que abençoe sua família e amigos. Interceda por aqueles que ainda não conhecem o amor de Cristo.",
        "Peça a Deus força para superar os desafios que enfrenta. Ore por proteção divina sobre sua vida e de seus entes queridos. Interceda pelos líderes de sua comunidade e nação.",
        "Ore por oportunidades de servir ao próximo e glorificar a Deus. Peça discernimento espiritual para reconhecer a vontade divina. Interceda por cura para os enfermos.",
        "Peça a Deus que use você como instrumento de Sua paz. Ore por provisão para suas necessidades e das pessoas ao seu redor. Interceda por missionários ao redor do mundo.",
        "Ore por crescimento espiritual e intimidade com Deus. Peça perdão por seus pecados e ajuda para viver em santidade. Interceda por unidade na igreja e entre os cristãos."
    ];

    const forgivenessTemplates = [
        "Reflita sobre relacionamentos que precisam de cura. Perdoe aqueles que te magoaram e peça perdão por suas próprias falhas. Lembre-se de que o perdão liberta tanto quem perdoa quanto quem é perdoado.",
        "Examine seu coração em busca de amargura ou ressentimento. Entregue essas feridas a Deus e permita que Ele cure seu coração. Perdoe-se pelos erros do passado e aceite o perdão de Deus.",
        "Pense em alguém com quem precisa se reconciliar. Peça a Deus coragem para dar o primeiro passo. Lembre-se de que Cristo nos perdoou primeiro, capacitando-nos a perdoar outros.",
        "Reconheça diante de Deus as áreas onde você falhou. Aceite Seu perdão completo e perdoe-se. Considere como você pode demonstrar perdão e graça aos outros hoje.",
        "Medite no perdão que Cristo oferece na cruz. Deixe que essa verdade transforme seu coração e suas atitudes. Perdoe como você foi perdoado - completamente e sem condições."
    ];

    // Generate content for each day of 2026
    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(2026, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `2026-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            
            if (!devotionalContent[dateStr]) {
                const verseIndex = (month + day) % verses.length;
                const reflectionIndex = (month * day) % reflectionTemplates.length;
                const prayerIndex = (month + day * 2) % prayerTemplates.length;
                const prayerRequestIndex = (month * day + day) % prayerRequestTemplates.length;
                const forgivenessIndex = (month + day * 3) % forgivenessTemplates.length;
                
                devotionalContent[dateStr] = {
                    verse: verses[verseIndex].text,
                    reference: verses[verseIndex].ref,
                    reflection: reflectionTemplates[reflectionIndex],
                    prayer: prayerTemplates[prayerIndex],
                    prayerRequest: prayerRequestTemplates[prayerRequestIndex],
                    forgiveness: forgivenessTemplates[forgivenessIndex]
                };
            }
        }
    }
}

// Initialize devotional content
generateYearContent();


