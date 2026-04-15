const translations = {
    // Smell Types
    "MYSTERIOUS_NAME": "Nome Misterioso",
    "DUPLICATED_CODE": "Código Duplicado",
    "LONG_METHOD": "Método Longo",
    "LONG_PARAMETER_LIST": "Lista de Parâmetros Longa",
    "GLOBAL_DATA": "Dados Globais",
    "MUTABLE_DATA": "Dados Mutáveis",
    "DIVERGENT_CHANGE": "Mudança Divergente",
    "SHOTGUN_SURGERY": "Cirurgia de Espingarda",
    "FEATURE_ENVY": "Inveja de Funcionalidade",
    "DATA_CLUMPS": "Aglomerado de Dados",
    "PRIMITIVE_OBSESSION": "Obsessão por Primitivos",
    "REPEATED_SWITCHES": "Switches Repetidos",
    "LAZY_ELEMENT": "Elemento Preguiçoso",
    "SPECULATIVE_GENERALITY": "Generalização Especulativa",
    "TEMPORARY_FIELD": "Campo Temporário",
    "MESSAGE_CHAINS": "Cadeia de Mensagens",
    "MIDDLE_MAN": "Homem do Meio",
    "LARGE_CLASS": "Classe Grande",
    "COMMENTS": "Comentários",

    // Categories
    "todos": "Todos",
    "bloaters": "Inchados",
    "object-orientation-abusers": "Abusos de Orientação a Objetos",
    "change-preventers": "Prevenidores de Mudança",
    "dispensables": "Descartáveis",
    "couplers": "Acopladores",
    "other-smells": "Outros Maus Cheiros",

    // Difficulties
    "ALL": "Todos",
    "EASY": "Fácil",
    "MEDIUM": "Médio",
    "HARD": "Difícil"
};

export const translate = (key) => translations[key] || key;