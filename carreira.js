"use strict";

const TOTAL_QUESTIONS = 20;

const PROFILE_KEYS = [
"governanca",
"gestao",
"operacional"
];

const SPECIALTY_KEYS = [
"grc",
"iam",
"cloud",
"devsecops",
"forense",
"blueTeam",
"incidentResponse",
"malware",
"redTeam",
"appsec"
];

const profiles = {

governanca: {
name: "Governança",

description:
"Seu perfil demonstra forte afinidade com estratégia, riscos, políticas, controles e tomada de decisão. Você tende a enxergar a segurança de forma ampla, conectando tecnologia, processos, pessoas e objetivos do negócio.",

characteristics: [
"Visão estratégica",
"Análise de riscos",
"Políticas e controles",
"Conformidade",
"Tomada de decisão",
"Organização"
],

references: [
"COSO",
"COBIT",
"ISO 27001",
"NIST CSF",
"LGPD"
]
},

gestao: {
name: "Gestão",

description:
"Seu perfil apresenta afinidade com organização, liderança, planejamento e coordenação. Você tende a gostar de conectar pessoas, processos, prioridades e recursos para fazer a segurança funcionar de forma estruturada.",

characteristics: [
"Liderança",
"Planejamento",
"Organização",
"Comunicação",
"Priorização",
"Coordenação"
],

references: [
"PMBOK",
"PRINCE2",
"ISO 27001",
"NIST CSF"
]
},

operacional: {
name: "Operacional",

description:
"Seu perfil demonstra afinidade com execução técnica, investigação e resolução de problemas. Você tende a aprender colocando a mão na massa, analisando ambientes, ferramentas, incidentes, vulnerabilidades e comportamentos suspeitos.",

characteristics: [
"Raciocínio técnico",
"Investigação",
"Resolução de problemas",
"Curiosidade",
"Execução",
"Análise prática"
],

references: [
"ITIL",
"MITRE ATT&CK",
"NIST",
"OWASP"
]
}

};

const specialties = {

grc: {
name: "GRC — Governança, Riscos e Conformidade",
profile: "governanca",

description:
"GRC trabalha com governança, análise de riscos, políticas, controles, auditoria e conformidade. É uma área indicada para quem gosta de entender como a segurança deve funcionar dentro da organização e como reduzir riscos para o negócio.",

paths: [
"Analista de GRC",
"Analista de Riscos",
"Compliance",
"Auditoria de Segurança",
"Privacidade",
"Governança de Segurança"
]
},

iam: {
name: "IAM — Gestão de Identidades e Acessos",
profile: "governanca",

description:
"IAM controla identidades, permissões e acessos a sistemas e informações. Combina processos, governança e tecnologia para garantir que cada pessoa tenha apenas os acessos necessários.",

paths: [
"IAM Analyst",
"Identity Governance",
"Access Management",
"PAM",
"Zero Trust"
]
},

cloud: {
name: "Segurança em Nuvem — Cloud Security",
profile: "operacional",

description:
"Cloud Security protege aplicações, dados, identidades, redes e serviços hospedados em ambientes de nuvem como AWS, Azure e Google Cloud.",

paths: [
"Cloud Security Analyst",
"Cloud Security Engineer",
"Security Engineer",
"Cloud IAM",
"Cloud Architecture"
]
},

devsecops: {
name: "DevSecOps",
profile: "operacional",

description:
"DevSecOps integra segurança ao desenvolvimento e à entrega de software. A área busca detectar vulnerabilidades cedo e automatizar verificações de segurança durante todo o ciclo de desenvolvimento.",

paths: [
"DevSecOps Engineer",
"Security Automation",
"CI/CD Security",
"Application Security",
"Cloud Security"
]
},

forense: {
name: "Forense Digital",
profile: "operacional",

description:
"Forense Digital investiga evidências digitais para compreender o que aconteceu durante incidentes, fraudes ou crimes cibernéticos. Exige atenção aos detalhes, investigação e raciocínio analítico.",

paths: [
"Digital Forensics",
"DFIR",
"Investigação Digital",
"Threat Investigation",
"Incident Analysis"
]
},

blueTeam: {
name: "Segurança Defensiva — Blue Team / SOC",
profile: "operacional",

description:
"Blue Team atua na defesa de ambientes, monitoramento de alertas, identificação de comportamentos suspeitos e proteção contínua de sistemas, redes e usuários.",

paths: [
"SOC Analyst",
"Blue Team Analyst",
"Security Monitoring",
"Threat Detection",
"Threat Hunting"
]
},

incidentResponse: {
name: "Resposta a Incidentes",
profile: "operacional",

description:
"Resposta a Incidentes trabalha na identificação, contenção, investigação e recuperação de incidentes de segurança. É uma área dinâmica que exige análise, prioridade e tomada de decisão sob pressão.",

paths: [
"Incident Responder",
"DFIR",
"SOC",
"CSIRT",
"Incident Handling"
]
},

malware: {
name: "Análise de Malware",
profile: "operacional",

description:
"Análise de Malware estuda códigos maliciosos para entender seu comportamento, técnicas utilizadas e possíveis formas de detecção e defesa.",

paths: [
"Malware Analyst",
"Reverse Engineering",
"Threat Research",
"Threat Intelligence",
"Detection Engineering"
]
},

redTeam: {
name: "Segurança Ofensiva — Red Team / Pentest",
profile: "operacional",

description:
"Segurança Ofensiva simula ataques autorizados para identificar vulnerabilidades antes que sejam exploradas por agentes maliciosos. Exige curiosidade, persistência e pensamento criativo.",

paths: [
"Pentester",
"Red Team",
"Ethical Hacking",
"Bug Bounty",
"Vulnerability Research"
]
},

appsec: {
name: "Application Security — AppSec",
profile: "operacional",

description:
"Application Security busca identificar e reduzir vulnerabilidades em aplicações. Envolve análise de código, arquitetura, testes de segurança e colaboração com equipes de desenvolvimento.",

paths: [
"AppSec Analyst",
"Code Review",
"Web Security",
"Secure Development",
"Product Security"
]
}

};

const questions = [

{
id: 1,
question: "Qual tipo de problema mais desperta seu interesse?",
options: [
{
label: "A",
text: "Entender riscos, regras, responsabilidades e como proteger o negócio.",
scores: {
governanca: 4,
grc: 4,
iam: 1
}
},
{
label: "B",
text: "Organizar pessoas, prioridades e recursos para resolver um problema.",
scores: {
gestao: 4,
grc: 1,
incidentResponse: 1
}
},
{
label: "C",
text: "Investigar alertas, comportamentos suspeitos e descobrir o que aconteceu.",
scores: {
operacional: 4,
blueTeam: 4,
forense: 2,
incidentResponse: 2
}
},
{
label: "D",
text: "Encontrar vulnerabilidades e descobrir como um sistema pode ser explorado.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 2,
question: "Em uma empresa, qual responsabilidade parece mais interessante para você?",
options: [
{
label: "A",
text: "Criar políticas, avaliar riscos e verificar se controles estão funcionando.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Coordenar projetos, equipes, prazos e prioridades.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Monitorar sistemas e responder a possíveis incidentes.",
scores: {
operacional: 4,
blueTeam: 4,
incidentResponse: 3
}
},
{
label: "D",
text: "Testar aplicações e sistemas para encontrar falhas.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 3
}
}
]
},

{
id: 3,
question: "Você recebe a notícia de que uma empresa sofreu um ataque. O que gostaria de descobrir primeiro?",
options: [
{
label: "A",
text: "Quais controles falharam e quais riscos não foram tratados.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Como organizar as pessoas responsáveis e priorizar a recuperação.",
scores: {
gestao: 4,
incidentResponse: 2
}
},
{
label: "C",
text: "Como o invasor entrou, o que fez e quais evidências deixou.",
scores: {
operacional: 4,
forense: 4,
incidentResponse: 3,
blueTeam: 2
}
},
{
label: "D",
text: "Qual vulnerabilidade permitiu o ataque e se eu conseguiria reproduzi-la.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 4,
question: "Qual destas atividades você teria mais curiosidade de aprender?",
options: [
{
label: "A",
text: "Avaliação de riscos, ISO 27001, LGPD e controles de segurança.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Gestão de projetos, liderança e planejamento estratégico.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "SIEM, análise de logs, detecção e investigação de incidentes.",
scores: {
operacional: 4,
blueTeam: 4,
incidentResponse: 2
}
},
{
label: "D",
text: "Pentest, exploração de vulnerabilidades e segurança de aplicações.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 3
}
}
]
},

{
id: 5,
question: "Uma pessoa solicita acesso a informações sensíveis da empresa. O que mais chama sua atenção nessa situação?",
options: [
{
label: "A",
text: "Saber se o acesso está de acordo com políticas e regras da organização.",
scores: {
governanca: 4,
iam: 4,
grc: 2
}
},
{
label: "B",
text: "Definir quem deve aprovar a solicitação e como organizar esse processo.",
scores: {
gestao: 4,
iam: 2
}
},
{
label: "C",
text: "Monitorar se aquela conta apresenta algum comportamento suspeito.",
scores: {
operacional: 4,
blueTeam: 3,
iam: 2
}
},
{
label: "D",
text: "Testar se seria possível obter privilégios maiores do que os permitidos.",
scores: {
operacional: 4,
redTeam: 3,
iam: 2
}
}
]
},

{
id: 6,
question: "Qual ambiente de trabalho parece combinar mais com você?",
options: [
{
label: "A",
text: "Analisando riscos, controles, documentos, processos e decisões.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Coordenando pessoas, reuniões, projetos e prioridades.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Acompanhando alertas, dashboards, logs e eventos de segurança.",
scores: {
operacional: 4,
blueTeam: 4
}
},
{
label: "D",
text: "Em laboratórios, terminais e aplicações tentando descobrir falhas.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 7,
question: "Quando você encontra um problema que não conhece, qual comportamento mais combina com você?",
options: [
{
label: "A",
text: "Primeiro tento entender o contexto, os riscos e o impacto da decisão.",
scores: {
governanca: 4,
grc: 2
}
},
{
label: "B",
text: "Divido o problema em etapas, defino prioridades e organizo a execução.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Investigo evidências e tento descobrir a causa do problema.",
scores: {
operacional: 4,
forense: 3,
incidentResponse: 2,
blueTeam: 2
}
},
{
label: "D",
text: "Faço testes e experimentos até entender como aquilo funciona.",
scores: {
operacional: 4,
redTeam: 3,
appsec: 2
}
}
]
},

{
id: 8,
question: "Uma aplicação será lançada em breve. Em qual parte você gostaria de participar?",
options: [
{
label: "A",
text: "Avaliar riscos, requisitos e controles necessários antes do lançamento.",
scores: {
governanca: 4,
grc: 3,
appsec: 1
}
},
{
label: "B",
text: "Organizar cronograma, responsáveis e comunicação entre as equipes.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Planejar monitoramento e detecção de atividades suspeitas após o lançamento.",
scores: {
operacional: 4,
blueTeam: 3
}
},
{
label: "D",
text: "Revisar código, testar vulnerabilidades e integrar segurança ao desenvolvimento.",
scores: {
operacional: 4,
appsec: 4,
devsecops: 3
}
}
]
},

{
id: 9,
question: "Qual destas frases mais representa sua forma de pensar?",
options: [
{
label: "A",
text: "Antes de agir, precisamos entender riscos, regras e consequências.",
scores: {
governanca: 4,
grc: 3
}
},
{
label: "B",
text: "Um bom resultado depende de planejamento, comunicação e organização.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Para descobrir o problema, precisamos observar evidências e comportamentos.",
scores: {
operacional: 4,
blueTeam: 3,
forense: 2
}
},
{
label: "D",
text: "Para saber se algo é realmente seguro, precisamos testá-lo.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 10,
question: "Qual desafio parece mais interessante para você?",
options: [
{
label: "A",
text: "Definir quais controles uma organização deveria implementar.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Planejar a implantação de um grande projeto de segurança.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Investigar milhares de eventos para encontrar sinais de um ataque.",
scores: {
operacional: 4,
blueTeam: 4,
incidentResponse: 2
}
},
{
label: "D",
text: "Descobrir uma falha que permita executar uma ação não autorizada.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 3
}
}
]
},

{
id: 11,
question: "Se você pudesse acompanhar um profissional por um dia, qual escolheria?",
options: [
{
label: "A",
text: "Um especialista avaliando riscos, auditorias e conformidade.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Um gestor coordenando projetos e decisões de segurança.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Um analista de SOC investigando alertas e incidentes.",
scores: {
operacional: 4,
blueTeam: 4,
incidentResponse: 2
}
},
{
label: "D",
text: "Um pentester tentando comprometer um ambiente autorizado.",
scores: {
operacional: 4,
redTeam: 4
}
}
]
},

{
id: 12,
question: "Pensando em infraestrutura e nuvem, qual atividade mais desperta sua curiosidade?",
options: [
{
label: "A",
text: "Definir políticas e requisitos para utilização segura da nuvem.",
scores: {
governanca: 4,
cloud: 2,
grc: 2
}
},
{
label: "B",
text: "Organizar a migração de sistemas e coordenar as equipes envolvidas.",
scores: {
gestao: 4,
cloud: 1
}
},
{
label: "C",
text: "Configurar identidades, permissões, redes e proteções no ambiente de nuvem.",
scores: {
operacional: 4,
cloud: 4,
iam: 2
}
},
{
label: "D",
text: "Testar configurações de nuvem em busca de falhas e exposições.",
scores: {
operacional: 4,
cloud: 3,
redTeam: 2
}
}
]
},

{
id: 13,
question: "Durante um incidente grave, qual papel você preferiria assumir?",
options: [
{
label: "A",
text: "Avaliar impacto, risco, obrigações e decisões necessárias.",
scores: {
governanca: 4,
grc: 3,
incidentResponse: 1
}
},
{
label: "B",
text: "Coordenar responsáveis, prioridades e comunicação durante a crise.",
scores: {
gestao: 4,
incidentResponse: 3
}
},
{
label: "C",
text: "Investigar evidências, conter o incidente e descobrir sua origem.",
scores: {
operacional: 4,
incidentResponse: 4,
forense: 3,
blueTeam: 2
}
},
{
label: "D",
text: "Entender tecnicamente como a exploração aconteceu e reproduzir o ataque.",
scores: {
operacional: 4,
redTeam: 3,
forense: 2
}
}
]
},

{
id: 14,
question: "Qual destes temas você estudaria por curiosidade, mesmo sem obrigação?",
options: [
{
label: "A",
text: "Governança, privacidade, riscos, auditoria e legislação.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Liderança, estratégia, projetos e gestão de equipes.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Threat Hunting, SIEM, investigação e análise de malware.",
scores: {
operacional: 4,
blueTeam: 3,
malware: 3,
forense: 2
}
},
{
label: "D",
text: "Hacking ético, exploração, Bug Bounty e segurança web.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 3
}
}
]
},

{
id: 15,
question: "Você encontra um arquivo suspeito em um computador. O que mais teria vontade de fazer?",
options: [
{
label: "A",
text: "Entender quais políticas e controles deveriam ter evitado o problema.",
scores: {
governanca: 4,
grc: 3
}
},
{
label: "B",
text: "Organizar quem precisa agir e quais etapas devem ser executadas.",
scores: {
gestao: 4,
incidentResponse: 2
}
},
{
label: "C",
text: "Investigar o arquivo, seu comportamento e possíveis indicadores de comprometimento.",
scores: {
operacional: 4,
malware: 4,
forense: 3
}
},
{
label: "D",
text: "Descobrir como aquele arquivo poderia explorar uma vulnerabilidade.",
scores: {
operacional: 4,
malware: 2,
redTeam: 3
}
}
]
},

{
id: 16,
question: "Qual atividade relacionada a desenvolvimento parece mais interessante?",
options: [
{
label: "A",
text: "Definir requisitos, políticas e critérios de segurança para os projetos.",
scores: {
governanca: 4,
grc: 2,
appsec: 1
}
},
{
label: "B",
text: "Organizar equipes e acompanhar a entrega do projeto.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Automatizar verificações de segurança dentro do processo de desenvolvimento.",
scores: {
operacional: 4,
devsecops: 4,
appsec: 2
}
},
{
label: "D",
text: "Revisar código e procurar vulnerabilidades diretamente na aplicação.",
scores: {
operacional: 4,
appsec: 4,
redTeam: 2
}
}
]
},

{
id: 17,
question: "Quando pensa em sua futura carreira, qual cenário mais atrai você?",
options: [
{
label: "A",
text: "Participar de decisões estratégicas sobre riscos e segurança da organização.",
scores: {
governanca: 4,
grc: 3
}
},
{
label: "B",
text: "Liderar projetos, equipes ou programas de segurança.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Ser referência na investigação e defesa de ambientes.",
scores: {
operacional: 4,
blueTeam: 3,
incidentResponse: 2,
forense: 2
}
},
{
label: "D",
text: "Ser referência técnica em encontrar e explorar vulnerabilidades.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 18,
question: "Qual resultado de um dia de trabalho faria você se sentir mais realizado?",
options: [
{
label: "A",
text: "Ter reduzido um risco importante para a organização.",
scores: {
governanca: 4,
grc: 4
}
},
{
label: "B",
text: "Ter conseguido organizar uma equipe e concluir uma entrega importante.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Ter detectado e interrompido uma ameaça antes que causasse danos.",
scores: {
operacional: 4,
blueTeam: 4,
incidentResponse: 3
}
},
{
label: "D",
text: "Ter descoberto uma vulnerabilidade complexa que ninguém havia percebido.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 19,
question: "Qual destas combinações de habilidades mais se aproxima de você?",
options: [
{
label: "A",
text: "Análise, visão de negócio, organização e interpretação de regras.",
scores: {
governanca: 4,
grc: 3
}
},
{
label: "B",
text: "Comunicação, liderança, planejamento e capacidade de priorizar.",
scores: {
gestao: 4
}
},
{
label: "C",
text: "Observação, investigação, paciência e raciocínio analítico.",
scores: {
operacional: 4,
blueTeam: 2,
forense: 3,
malware: 2
}
},
{
label: "D",
text: "Curiosidade, criatividade, persistência e vontade de testar limites.",
scores: {
operacional: 4,
redTeam: 4,
appsec: 2
}
}
]
},

{
id: 20,
question: "Se daqui a alguns anos você fosse reconhecido profissionalmente, por qual tipo de problema gostaria de ser conhecido por resolver?",
options: [
{
label: "A",
text: "Problemas complexos envolvendo riscos, decisões, controles e proteção do negócio.",
scores: {
governanca: 5,
grc: 4,
iam: 1
}
},
{
label: "B",
text: "Problemas que exigem organizar pessoas, prioridades, recursos e execução.",
scores: {
gestao: 5
}
},
{
label: "C",
text: "Ataques, incidentes e investigações técnicas difíceis.",
scores: {
operacional: 5,
blueTeam: 3,
incidentResponse: 4,
forense: 3,
malware: 1
}
},
{
label: "D",
text: "Vulnerabilidades e falhas técnicas que poucas pessoas conseguem encontrar.",
scores: {
operacional: 5,
redTeam: 4,
appsec: 3
}
}
]
}

];

const otherKeywords = {

governanca: [
"governanca",
"risco",
"riscos",
"politica",
"politicas",
"auditoria",
"compliance",
"lgpd",
"iso",
"norma",
"normas",
"controle",
"controles",
"privacidade",
"estrategia"
],

gestao: [
"gestao",
"lideranca",
"liderar",
"equipe",
"equipes",
"projeto",
"projetos",
"planejamento",
"organizar",
"organizacao",
"prioridade",
"prioridades",
"comunicacao"
],

operacional: [
"tecnico",
"tecnica",
"investigar",
"investigacao",
"terminal",
"linux",
"rede",
"redes",
"servidor",
"servidores",
"log",
"logs"
],

grc: [
"grc",
"compliance",
"auditoria",
"risco",
"riscos",
"lgpd",
"iso 27001",
"cobit",
"coso",
"governanca"
],

iam: [
"iam",
"identidade",
"identidades",
"acesso",
"acessos",
"permissao",
"permissoes",
"autenticacao",
"privilegio",
"pam"
],

cloud: [
"cloud",
"nuvem",
"aws",
"azure",
"google cloud",
"gcp",
"kubernetes",
"container"
],

devsecops: [
"devsecops",
"pipeline",
"ci/cd",
"cicd",
"automacao",
"deploy",
"desenvolvimento seguro"
],

forense: [
"forense",
"forensics",
"evidencia",
"evidencias",
"investigacao digital",
"dfir"
],

blueTeam: [
"blue team",
"blueteam",
"soc",
"siem",
"defesa",
"defensiva",
"monitoramento",
"deteccao",
"threat hunting",
"alerta",
"alertas"
],

incidentResponse: [
"incidente",
"incidentes",
"resposta a incidentes",
"contencao",
"csirt",
"mitigacao"
],

malware: [
"malware",
"virus",
"ransomware",
"trojan",
"reverse engineering",
"engenharia reversa"
],

redTeam: [
"red team",
"redteam",
"pentest",
"pentester",
"hacking",
"hacker",
"exploit",
"exploracao",
"bug bounty",
"vulnerabilidade",
"vulnerabilidades"
],

appsec: [
"appsec",
"aplicacao",
"aplicacoes",
"codigo",
"code review",
"owasp",
"seguranca web",
"software"
]

};

let quizQuestions = [...questions];

let currentQuestionIndex = 0;

let answers = {};

let userData = {
name: "",
email: "",
marketingConsent: false,
consentDate: null,
testStartedAt: null,
testFinishedAt: null
};

const identificationCard =
document.getElementById("identification-card");

const identificationForm =
document.getElementById("identification-form");

const userNameInput =
document.getElementById("user-name");

const userEmailInput =
document.getElementById("user-email");

const marketingConsentInput =
document.getElementById("marketing-consent");

const identificationMessage =
document.getElementById("identification-message");

const quizCard =
document.getElementById("quiz-card");

const quizUserGreeting =
document.getElementById("quiz-user-greeting");

const questionProgress =
document.getElementById("question-progress");

const progressFill =
document.getElementById("progress-fill");

const questionTitle =
document.getElementById("question-title");

const quizOptions =
document.getElementById("quiz-options");

const otherAnswerContainer =
document.getElementById("other-answer-container");

const otherAnswer =
document.getElementById("other-answer");

const characterCount =
document.getElementById("character-count");

const quizMessage =
document.getElementById("quiz-message");

const previousButton =
document.getElementById("previous-button");

const nextButton =
document.getElementById("next-button");

const resultCard =
document.getElementById("result-card");

const resultUserName =
document.getElementById("result-user-name");

const profileTitle =
document.getElementById("profile-title");

const profileScore =
document.getElementById("profile-score");

const profileLevel =
document.getElementById("profile-level");

const profileScoreBar =
document.getElementById("profile-score-bar");

const profileDescription =
document.getElementById("profile-description");

const profileTags =
document.getElementById("profile-tags");

const specialtyTitle =
document.getElementById("specialty-title");

const specialtyScore =
document.getElementById("specialty-score");

const specialtyLevel =
document.getElementById("specialty-level");

const specialtyScoreBar =
document.getElementById("specialty-score-bar");

const specialtyDescription =
document.getElementById("specialty-description");

const careerTags =
document.getElementById("career-tags");

const secondarySpecialties =
document.getElementById("secondary-specialties");

const referenceTags =
document.getElementById("reference-tags");

const resultEmail =
document.getElementById("result-email");

const resultDate =
document.getElementById("result-date");

const marketingStatus =
document.getElementById("marketing-status");

const restartButton =
document.getElementById("restart-button");

function escapeHTML(value) {

return String(value)
.replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;")
.replaceAll("'", "&#039;");

}

function normalizeText(text) {

return String(text)
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "");

}

function isValidEmail(email) {

const value =
String(email).trim();

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

}

function formatDateTime(date) {

if (!date) {
return "Não informado";
}

return new Intl.DateTimeFormat(
"pt-BR",
{
dateStyle: "short",
timeStyle: "short"
}
).format(date);

}

function shuffleArray(array) {

const shuffled =
[...array];

for (
let index = shuffled.length - 1;
index > 0;
index--
) {

const randomIndex =
Math.floor(
Math.random() * (index + 1)
);

[
shuffled[index],
shuffled[randomIndex]
] = [
shuffled[randomIndex],
shuffled[index]
];

}

return shuffled;

}

function scrollToElement(element) {

if (!element) {
return;
}

element.scrollIntoView({
behavior: "smooth",
block: "start"
});

}

function startQuiz(event) {

event.preventDefault();

const name =
userNameInput
? userNameInput.value.trim()
: "";

const email =
userEmailInput
? userEmailInput.value.trim()
: "";

if (!name) {

identificationMessage.textContent =
"Digite seu nome para continuar.";

userNameInput.focus();

return;
}

if (!email) {

identificationMessage.textContent =
"Digite seu e-mail para continuar.";

userEmailInput.focus();

return;
}

if (!isValidEmail(email)) {

identificationMessage.textContent =
"Digite um endereço de e-mail válido.";

userEmailInput.focus();

return;
}

userData = {

name: name,

email: email,

marketingConsent:
marketingConsentInput
? marketingConsentInput.checked
: false,

consentDate:
marketingConsentInput &&
marketingConsentInput.checked
? new Date()
: null,

testStartedAt:
new Date(),

testFinishedAt:
null

};

currentQuestionIndex = 0;

answers = {};

quizQuestions = [...questions];

identificationMessage.textContent = "";

identificationCard.hidden = true;

resultCard.hidden = true;

quizCard.hidden = false;

const firstName =
name.split(/\s+/)[0];

if (quizUserGreeting) {

quizUserGreeting.textContent =
`Vamos começar, ${firstName}.`;

}

renderQuestion();

scrollToElement(quizCard);

}

function renderQuestion() {

const currentQuestion =
quizQuestions[currentQuestionIndex];

if (!currentQuestion) {

console.error(
"Não foi possível localizar a pergunta atual."
);

return;
}

const progress =
Math.round(
(
(currentQuestionIndex + 1) /
TOTAL_QUESTIONS
) * 100
);

questionProgress.textContent =
`Pergunta ${currentQuestionIndex + 1} de ${TOTAL_QUESTIONS} - ${progress}%`;

progressFill.style.width =
`${progress}%`;

questionTitle.textContent =
currentQuestion.question;

quizOptions.innerHTML = "";

quizMessage.textContent = "";

otherAnswerContainer.hidden = true;

otherAnswer.value = "";

characterCount.textContent = "0";

const savedAnswer =
answers[currentQuestion.id];

currentQuestion.options.forEach(
(option, optionIndex) => {

const label =
document.createElement("label");

label.className =
"quiz-option";

const radio =
document.createElement("input");

radio.type =
"radio";

radio.name =
`question-${currentQuestion.id}`;

radio.value =
String(optionIndex);

if (
savedAnswer &&
savedAnswer.type === "option" &&
savedAnswer.optionIndex === optionIndex
) {

radio.checked = true;

}

const span =
document.createElement("span");

const strong =
document.createElement("strong");

strong.textContent =
`${option.label}.`;

span.appendChild(strong);

span.appendChild(
document.createTextNode(
` ${option.text}`
)
);

label.appendChild(radio);

label.appendChild(span);

radio.addEventListener(
"change",
() => {

answers[currentQuestion.id] = {
type: "option",
optionIndex: optionIndex
};

otherAnswerContainer.hidden =
true;

otherAnswer.value =
"";

characterCount.textContent =
"0";

quizMessage.textContent =
"";

}
);

quizOptions.appendChild(label);

}
);

const otherLabel =
document.createElement("label");

otherLabel.className =
"quiz-option";

const otherRadio =
document.createElement("input");

otherRadio.type =
"radio";

otherRadio.name =
`question-${currentQuestion.id}`;

otherRadio.value =
"other";

const otherSpan =
document.createElement("span");

const otherStrong =
document.createElement("strong");

otherStrong.textContent =
"Outro";

otherSpan.appendChild(otherStrong);

otherSpan.appendChild(
document.createTextNode(
" — quero escrever minha resposta."
)
);

otherLabel.appendChild(otherRadio);

otherLabel.appendChild(otherSpan);

quizOptions.appendChild(otherLabel);

otherRadio.addEventListener(
"change",
() => {

otherAnswerContainer.hidden =
false;

quizMessage.textContent =
"";

otherAnswer.focus();

}
);

if (
savedAnswer &&
savedAnswer.type === "other"
) {

otherRadio.checked =
true;

otherAnswerContainer.hidden =
false;

otherAnswer.value =
savedAnswer.text || "";

characterCount.textContent =
String(
(savedAnswer.text || "").length
);

}

previousButton.disabled =
currentQuestionIndex === 0;

nextButton.textContent =
currentQuestionIndex ===
TOTAL_QUESTIONS - 1
? "Ver resultado"
: "Próxima";

}

function saveCurrentAnswer() {

const currentQuestion =
quizQuestions[currentQuestionIndex];

const selected =
document.querySelector(
`input[name="question-${currentQuestion.id}"]:checked`
);

if (!selected) {

quizMessage.textContent =
"Escolha uma alternativa para continuar.";

return false;

}

if (selected.value === "other") {

const text =
otherAnswer.value.trim();

if (!text) {

quizMessage.textContent =
"Escreva sua resposta no campo Outro para continuar.";

otherAnswer.focus();

return false;

}

answers[currentQuestion.id] = {
type: "other",
text: text
};

} else {

const optionIndex =
Number(selected.value);

if (
Number.isNaN(optionIndex) ||
!currentQuestion.options[optionIndex]
) {

quizMessage.textContent =
"Não foi possível registrar esta resposta. Selecione novamente.";

return false;

}

answers[currentQuestion.id] = {
type: "option",
optionIndex: optionIndex
};

}

quizMessage.textContent = "";

return true;

}

function nextQuestion() {

if (!saveCurrentAnswer()) {
return;
}

if (
currentQuestionIndex <
TOTAL_QUESTIONS - 1
) {

currentQuestionIndex++;

renderQuestion();

scrollToElement(quizCard);

return;

}

calculateResult();

}

function previousQuestion() {

if (currentQuestionIndex <= 0) {
return;
}

saveAnswerWithoutValidation();

currentQuestionIndex--;

renderQuestion();

scrollToElement(quizCard);

}

function saveAnswerWithoutValidation() {

const currentQuestion =
quizQuestions[currentQuestionIndex];

const selected =
document.querySelector(
`input[name="question-${currentQuestion.id}"]:checked`
);

if (!selected) {
return;
}

if (selected.value === "other") {

answers[currentQuestion.id] = {
type: "other",
text: otherAnswer.value.trim()
};

} else {

answers[currentQuestion.id] = {
type: "option",
optionIndex:
Number(selected.value)
};

}

}

function updateCharacterCounter() {

characterCount.textContent =
String(
otherAnswer.value.length
);

}

function createEmptyScores() {

const profileScores = {};

const specialtyScores = {};

PROFILE_KEYS.forEach(
key => {
profileScores[key] = 0;
}
);

SPECIALTY_KEYS.forEach(
key => {
specialtyScores[key] = 0;
}
);

return {
profileScores,
specialtyScores
};

}

function applyScores(
scores,
profileScores,
specialtyScores
) {

Object.entries(scores).forEach(
([key, value]) => {

if (
Object.prototype.hasOwnProperty.call(
profileScores,
key
)
) {

profileScores[key] += value;

}

if (
Object.prototype.hasOwnProperty.call(
specialtyScores,
key
)
) {

specialtyScores[key] += value;

}

}
);

}

function analyzeOtherAnswer(
text,
profileScores,
specialtyScores
) {

const normalized =
normalizeText(text);

Object.entries(otherKeywords).forEach(
([key, keywords]) => {

let matches = 0;

keywords.forEach(
keyword => {

if (
normalized.includes(
normalizeText(keyword)
)
) {

matches++;

}

}
);

if (matches === 0) {
return;
}

const points =
Math.min(
4,
matches + 1
);

if (
Object.prototype.hasOwnProperty.call(
profileScores,
key
)
) {

profileScores[key] +=
points;

}

if (
Object.prototype.hasOwnProperty.call(
specialtyScores,
key
)
) {

specialtyScores[key] +=
points;

const specialty =
specialties[key];

if (
specialty &&
specialty.profile &&
Object.prototype.hasOwnProperty.call(
profileScores,
specialty.profile
)
) {

profileScores[
specialty.profile
] += Math.max(
1,
Math.ceil(points / 2)
);

}

}

}
);

}

function sortScores(scores) {

return Object.entries(scores)
.sort(
(a, b) => b[1] - a[1]
);

}

function calculateAffinityIndex(
topScore,
secondScore,
totalScore
) {

if (
totalScore <= 0 ||
topScore <= 0
) {

return 55;

}

const share =
topScore / totalScore;

const dominance =
topScore > 0
? (
(topScore - secondScore) /
topScore
)
: 0;

const score =
55 +
(share * 35) +
(dominance * 10);

return Math.max(
55,
Math.min(
96,
Math.round(score)
)
);

}

function calculateSpecialtyAffinity(
specialtyScore,
topSpecialtyScore,
profileAffinity
) {

if (
specialtyScore <= 0 ||
topSpecialtyScore <= 0
) {

return 50;

}

const relative =
specialtyScore /
topSpecialtyScore;

const score =
(
profileAffinity * 0.55
) +
(
relative * 45
);

return Math.max(
0,
Math.min(
100,
Math.round(score)
)
);

}

function getAffinityLevel(score) {

if (score >= 85) {
return "Afinidade Muito alta";
}

if (score >= 75) {
return "Afinidade Alta";
}

if (score >= 65) {
return "Afinidade Moderada Alta";
}

if (score >= 55) {
return "Afinidade Moderada";
}

if (score >= 30) {
return "Afinidade Média";
}

return "Afinidade Baixa";

}

function calculateResult() {

const answeredQuestions =
questions.filter(
question =>
Boolean(answers[question.id])
);

if (
answeredQuestions.length !==
TOTAL_QUESTIONS
) {

quizMessage.textContent =
`Ainda existem ${
TOTAL_QUESTIONS -
answeredQuestions.length
} pergunta(s) sem resposta.`;

return;

}

const {
profileScores,
specialtyScores
} = createEmptyScores();

questions.forEach(
question => {

const answer =
answers[question.id];

if (answer.type === "option") {

const option =
question.options[
answer.optionIndex
];

if (option) {

applyScores(
option.scores,
profileScores,
specialtyScores
);

}

}

if (answer.type === "other") {

analyzeOtherAnswer(
answer.text,
profileScores,
specialtyScores
);

}

}
);

const sortedProfiles =
sortScores(profileScores);

const sortedSpecialties =
sortScores(specialtyScores);

const topProfileKey =
sortedProfiles[0][0];

const topProfileScore =
sortedProfiles[0][1];

const secondProfileScore =
sortedProfiles[1]
? sortedProfiles[1][1]
: 0;

const totalProfileScore =
sortedProfiles.reduce(
(total, item) =>
total + item[1],
0
);

if (
!profiles[topProfileKey] ||
topProfileScore <= 0
) {

quizMessage.textContent =
"Não foi possível calcular seu perfil. Revise suas respostas.";

return;

}

const profileAffinity =
calculateAffinityIndex(
topProfileScore,
secondProfileScore,
totalProfileScore
);

const compatibleSpecialties =
sortedSpecialties.filter(
([key, score]) => {

return (
score > 0 &&
specialties[key] &&
specialties[key].profile ===
topProfileKey
);

}
);

const specialtyRanking =
compatibleSpecialties.length > 0
? compatibleSpecialties
: sortedSpecialties.filter(
([, score]) =>
score > 0
);

if (
specialtyRanking.length === 0
) {

quizMessage.textContent =
"Não foi possível identificar uma especialidade.";

return;

}

const topSpecialtyKey =
specialtyRanking[0][0];

const topSpecialtyScore =
specialtyRanking[0][1];

const topSpecialty =
specialties[topSpecialtyKey];

if (!topSpecialty) {

quizMessage.textContent =
"Ocorreu um erro ao carregar sua especialidade.";

return;

}

const specialtyAffinity =
calculateSpecialtyAffinity(
topSpecialtyScore,
topSpecialtyScore,
profileAffinity
);

const secondarySpecialties =
sortedSpecialties
.filter(
([key, score]) =>
key !== topSpecialtyKey &&
score > 0
)
.slice(0, 2)
.map(
([key, score]) => {

return {
key: key,

affinity:
calculateSpecialtyAffinity(
score,
topSpecialtyScore,
profileAffinity
)
};

}
);

userData.testFinishedAt =
new Date();

const result = {

profileKey:
topProfileKey,

profile:
profiles[topProfileKey],

profileAffinity:
profileAffinity,

profileLevel:
getAffinityLevel(
profileAffinity
),

specialtyKey:
topSpecialtyKey,

specialty:
topSpecialty,

specialtyAffinity:
specialtyAffinity,

specialtyLevel:
getAffinityLevel(
specialtyAffinity
),

secondarySpecialties:
secondarySpecialties

};

renderResult(result);

}

function renderResult(result) {

if (
!result ||
!result.profile ||
!result.specialty
) {

quizMessage.textContent =
"Não foi possível gerar o resultado. Tente novamente.";

return;

}

if (resultUserName) {

resultUserName.textContent =
`Resultado de ${userData.name}`;

}

profileTitle.textContent =
result.profile.name;

profileScore.textContent =
`${result.profileAffinity}/100`;

profileLevel.textContent =
`${result.profileLevel} com este perfil`;

profileDescription.textContent =
result.profile.description;

profileScoreBar.style.width =
"0%";

requestAnimationFrame(
() => {

profileScoreBar.style.width =
`${result.profileAffinity}%`;

}
);

profileTags.innerHTML =
result.profile.characteristics
.map(
item => `
<span class="profile-tag">
${escapeHTML(item)}
</span>
`
)
.join("");

specialtyTitle.textContent =
result.specialty.name;

specialtyScore.textContent =
`${result.specialtyAffinity}/100`;

specialtyLevel.textContent =
`${result.specialtyLevel} com esta especialidade`;

specialtyDescription.textContent =
result.specialty.description;

specialtyScoreBar.style.width =
"0%";

requestAnimationFrame(
() => {

specialtyScoreBar.style.width =
`${result.specialtyAffinity}%`;

}
);

careerTags.innerHTML =
result.specialty.paths
.map(
path => `
<span class="career-tag">
${escapeHTML(path)}
</span>
`
)
.join("");

secondarySpecialties.innerHTML =
result.secondarySpecialties
.map(
item => {

const specialty =
specialties[item.key];

if (!specialty) {
return "";
}

return `
<div class="secondary-specialty">

<div class="secondary-specialty-top">

<span class="secondary-specialty-name">
${escapeHTML(
specialty.name
)}
</span>

<strong class="secondary-specialty-score">
${item.affinity}/100
</strong>

</div>

<p class="secondary-specialty-level">
${escapeHTML(
getAffinityLevel(
item.affinity
)
)}
</p>

</div>
`;

}
)
.join("");

referenceTags.innerHTML =
result.profile.references
.map(
reference => `
<span class="reference-tag">
${escapeHTML(reference)}
</span>
`
)
.join("");

resultEmail.textContent =
userData.email;

resultDate.textContent =
formatDateTime(
userData.testFinishedAt
);

if (userData.marketingConsent) {

marketingStatus.textContent =
"Você autorizou o recebimento de novidades e conteúdos relacionados ao seu perfil.";

} else {

marketingStatus.textContent =
"Você optou por não receber novidades por e-mail.";

}

quizCard.hidden =
true;

identificationCard.hidden =
true;

resultCard.hidden =
false;

scrollToElement(resultCard);

console.log(
"Resultado Lady Cyber:",
{
user: userData,
result: result
}
);

}

function restartQuiz() {

currentQuestionIndex =
0;

answers =
{};

quizQuestions =
shuffleArray(questions);

userData.testStartedAt =
new Date();

userData.testFinishedAt =
null;

resultCard.hidden =
true;

quizCard.hidden =
false;

quizMessage.textContent =
"";

renderQuestion();

scrollToElement(quizCard);

}

if (identificationForm) {

identificationForm.addEventListener(
"submit",
startQuiz
);

}

if (nextButton) {

nextButton.addEventListener(
"click",
nextQuestion
);

}

if (previousButton) {

previousButton.addEventListener(
"click",
previousQuestion
);

}

if (otherAnswer) {

otherAnswer.addEventListener(
"input",
updateCharacterCounter
);

}

if (restartButton) {

restartButton.addEventListener(
"click",
restartQuiz
);

}

function validateRequiredElements() {

const requiredElements = [

["identification-card", identificationCard],
["identification-form", identificationForm],
["user-name", userNameInput],
["user-email", userEmailInput],

["quiz-card", quizCard],
["question-progress", questionProgress],
["progress-fill", progressFill],
["question-title", questionTitle],
["quiz-options", quizOptions],
["other-answer-container", otherAnswerContainer],
["other-answer", otherAnswer],
["character-count", characterCount],
["quiz-message", quizMessage],
["next-button", nextButton],
["previous-button", previousButton],

["result-card", resultCard],
["profile-title", profileTitle],
["profile-score", profileScore],
["profile-level", profileLevel],
["profile-score-bar", profileScoreBar],
["profile-description", profileDescription],
["profile-tags", profileTags],

["specialty-title", specialtyTitle],
["specialty-score", specialtyScore],
["specialty-level", specialtyLevel],
["specialty-score-bar", specialtyScoreBar],
["specialty-description", specialtyDescription],
["career-tags", careerTags],

["secondary-specialties", secondarySpecialties],
["reference-tags", referenceTags],

["result-email", resultEmail],
["result-date", resultDate],
["marketing-status", marketingStatus],

["restart-button", restartButton]

];

const missing =
requiredElements
.filter(
([, element]) =>
!element
)
.map(
([id]) =>
`#${id}`
);

if (missing.length > 0) {

console.error(
"Lady Cyber — elementos ausentes no HTML:",
missing
);

return false;

}

console.log(
"Lady Cyber — HTML e JavaScript conectados corretamente."
);

return true;

}

function initializeQuiz() {

const htmlIsValid =
validateRequiredElements();

if (!htmlIsValid) {

console.error(
"O teste não foi iniciado porque o HTML não corresponde ao JavaScript."
);

return;

}

identificationCard.hidden =
false;

quizCard.hidden =
true;

resultCard.hidden =
true;

progressFill.style.width =
"5%";

identificationMessage.textContent =
"";

profileTitle.textContent =
"";

profileScore.textContent =
"";

profileLevel.textContent =
"";

profileDescription.textContent =
"";

profileTags.innerHTML =
"";

specialtyTitle.textContent =
"";

specialtyScore.textContent =
"";

specialtyLevel.textContent =
"";

specialtyDescription.textContent =
"";

careerTags.innerHTML =
"";

secondarySpecialties.innerHTML =
"";

referenceTags.innerHTML =
"";

resultEmail.textContent =
"";

resultDate.textContent =
"";

marketingStatus.textContent =
"";

}

initializeQuiz();