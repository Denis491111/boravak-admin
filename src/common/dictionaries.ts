export const userState = {
    1: "Знакомство",
    2: "Дорожная карта"
};

export const entranceEnum = (code) => {
    return ([
        {
            code: 1,
            name: "Начало"
        },
        {
            code: 2,
            name: "Информация о подающих документы"
        },
        {
            code: 3,
            name: "Выбор основания для подачи"
        },
        {
            code: 4,
            name: "Подтверждение"
        },
        {
            code: 5,
            name: "Оплата"
        }
    ].find(el => el.code === code) || {}).name;
};

export const ROADMAP_NAMES = {
    PHONE_NUMBER: "Номер телефона",
    FLAT_RENT: "Аренда недвижимости",
    BANK_ACCOUNT_BOTH: "Банковские счета для физлица и юрлица",
    DOCUMENTS_TRANSLATION: "Судебный перевод документов",
    LEGAL_ADDRESS: "Юридический адрес",
    IP_DOCUMENTS: "Подготовка документов для регистрации ИП",
    IP_PROCESS: "Процесс регистрации ИП",
    BORAVAK_DOCUMENTS: "Подготовка документов для подачи на ВНЖ",
    BORAVAK_PROCESS: "Процесс получения ВНЖ",
    WORKING_PERMISSION_DOCUMENTS: "Подготовка документов для разрешения на работу",
    WORKING_PERMISSION_PROCESS: "Процесс получения разрешения на работу",
    IP_OPEN_FINISH: "Оплата налогов и продление ВНЖ",
    WELCOME: "Начало",
    FINISH: "Заключение",
    EXISTING_BUSINESS_DATA: "Данные ИП",
    BANK_ACCOUNT_NATURAL: "Банковский счет",
    NON_MARRIAGE_CERTIFICATE: "Справка об отсутствии брака",
    COURSES_DATA: "Данные образовательного учреждения",
    UNIVERSITY_DATA: "Данные образовательного учреждения",
    DORM_DATA: "Данные общежития",
    ESTATE_DATA: "Данные о недвижимости",
    IZVOD: "Получение Извода"
};

export const familyModeEnum = {
    1: "Один человек, текущий пользователь",
    2: "Текущий пользователь и его семья"
};

export enum IUserInfoReason {
    REUNIFICATION = 1,
    REUNIFICATION_WITH_CITIZEN = 2,
    BUSINESS_ALREADY_OPENED_WITHOUT_WORKING_PERMISSION = 3,
    BUSINESS_NEED_TO_OPEN = 4,
    ESTATE = 6,
    PAIR = 7,
    PAIR_WITH_CITIZEN = 8,
    BUSINESS_ALREADY_OPENED_WITH_WORKING_PERMISSION = 9,
    REUNIFICATION_FOR_CHILD = 11,
    REUNIFICATION_PARENT = 12,
}

export const REASONS_ADULT_LIST = [
    {
        id: IUserInfoReason.BUSINESS_NEED_TO_OPEN,
        name: "Я хочу открыть ИП в Сербии и получить ВНЖ",
        readable: "Открытие бизнеса"
    },
    {
        id: IUserInfoReason.REUNIFICATION,
        name: "Мой супруг/супруга (гражданин/-ка России) уже имеет ВНЖ Сербии",
        readable: "Воссоединение семьи"
    },
    {
        id: IUserInfoReason.BUSINESS_ALREADY_OPENED_WITHOUT_WORKING_PERMISSION,
        name: "У меня уже есть открытое ИП в Сербии, но нет разрешения на работу",
        readable: "Открытие бизнеса"
    },
    {
        id: IUserInfoReason.BUSINESS_ALREADY_OPENED_WITH_WORKING_PERMISSION,
        name: "У меня уже есть открытое ИП в Сербии и разрешение на работу",
        readable: "Открытие бизнеса"
    },
    {
        id: IUserInfoReason.PAIR,
        name: "Я состою в гражданском браке с россиянином, у которого есть сербский ВНЖ",
        readable: "Воссоединение семьи"
    },
    {
        id: IUserInfoReason.REUNIFICATION_WITH_CITIZEN,
        name: "Я состою в браке с гражданином Сербии",
        readable: "Воссоединение семьи"
    },
    {
        id: IUserInfoReason.PAIR_WITH_CITIZEN,
        name: "Я состою в гражданском браке с гражданином Сербии",
        readable: "Воссоединение семьи"
    },
    {
        id: IUserInfoReason.ESTATE,
        name: "Я владею недвижимостью в Сербии",
        readable: "Владение недвижимостью"
    },
    {
        id: IUserInfoReason.REUNIFICATION_FOR_CHILD,
        name: `Воссоединение семьи (ребенок)`
    },
    {
        id: IUserInfoReason.REUNIFICATION_PARENT,
        name: `Воссоединение семьи (родитель)`
    }
];

export const documentsNames = {
    legal_address_contract: "Договор на предоставление услуги Виртуальный адрес юридического лица",
    signed_legal_address_contract: "Подписанный пользователем договор на Виртуальный адрес" as any,
    legal_address_permission: "Согласие владельца недвижимости на оформление юридического адреса по адресу проживания",
    bill_registration_business: "Госпошлина за регистрацию ИП",
    anket_registration_business: "Заявление на регистрацию ИП",
    anket_boravak: "Заявление на получение ВНЖ",
    bill_boravak: "Госпошлины за выдачу ВНЖ",
    boravak_personal_data: "Согласие на обработку персональных данных при выдаче ВНЖ",
    insurance_company_guarantee: "Гарантия от компании",
    landlord_living_saglasnost: "Согласие на проживание от собственника недвижимости",
    bill_working_permission: "Госпошлины за выдачу разрешения на работу",
    anket_izvod: "Заявление на получение Извода о регистрованим подациома привредног субjекта",
    radna_dozvola_anket: "Заявление на получение Разрешения на работу",
    radna_dozvola_letter: "Сопроводительное письмо для Разрешения на работу",
    bill_office_first_month: "Счет на оплату первого месяца виртуального офиса",
    bill_izvod: "Счет на оплату получения Извода"
};
