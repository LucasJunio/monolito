const countries = [{
    nome: "Andorra",
    sigla: "AD"
}, {
    nome: "Emirados Árabes Unidos",
    sigla: "AE"
}, {
    nome: "Afeganistão",
    sigla: "AF"
}, {
    nome: "Antígua e Barbuda",
    sigla: "AG"
}, {
    nome: "Albânia",
    sigla: "AL"
}, {
    nome: "Armênia",
    sigla: "AM"
}, {
    nome: "Angola",
    sigla: "AO"
}, {
    nome: "Argentina",
    sigla: "AR"
}, {
    nome: "Áustria",
    sigla: "AT"
}, {
    nome: "Austrália",
    sigla: "AU"
}, {
    nome: "Azerbaijão",
    sigla: "AZ"
}, {
    nome: "Bósnia e Herzegovina",
    sigla: "BA"
}, {
    nome: "Barbados",
    sigla: "BB"
}, {
    nome: "Bangladesh",
    sigla: "BD"
}, {
    nome: "Bélgica",
    sigla: "BE"
}, {
    nome: "Burkina Faso",
    sigla: "BF"
}, {
    nome: "Bulgária",
    sigla: "BG"
}, {
    nome: "Barein",
    sigla: "BH"
}, {
    nome: "Burundi",
    sigla: "BI"
}, {
    nome: "Benin",
    sigla: "BJ"
}, {
    nome: "Brunei",
    sigla: "BN"
}, {
    nome: "Bolívia",
    sigla: "BO"
}, {
    nome: "Brasil",
    sigla: "BR"
}, {
    nome: "Bahamas",
    sigla: "BS"
}, {
    nome: "Butão",
    sigla: "BT"
}, {
    nome: "Botsuana",
    sigla: "BW"
}, {
    nome: "Belarus",
    sigla: "BY"
}, {
    nome: "Belize",
    sigla: "BZ"
}, {
    nome: "Canadá",
    sigla: "CA"
}, {
    nome: "República Democrática do Congo",
    sigla: "CD"
}, {
    nome: "República Centro Africana",
    sigla: "CF"
}, {
    nome: "Congo",
    sigla: "CG"
}, {
    nome: "Suíça",
    sigla: "CH"
}, {
    nome: "Costa do Marfim",
    sigla: "CI"
}, {
    nome: "Chile",
    sigla: "CL"
}, {
    nome: "Camarões",
    sigla: "CM"
}, {
    nome: "China",
    sigla: "CN"
}, {
    nome: "Colômbia",
    sigla: "CO"
}, {
    nome: "Costa Rica",
    sigla: "CR"
}, {
    nome: "Cuba",
    sigla: "CU"
}, {
    nome: "Cabo Verde",
    sigla: "CV"
}, {
    nome: "Chipre",
    sigla: "CY"
}, {
    nome: "República Tcheca",
    sigla: "CZ"
}, {
    nome: "Alemanha",
    sigla: "DE"
}, {
    nome: "Djibouti",
    sigla: "DJ"
}, {
    nome: "Dinamarca",
    sigla: "DK"
}, {
    nome: "Dominica",
    sigla: "DM"
}, {
    nome: "República Dominicana",
    sigla: "DO"
}, {
    nome: "Argélia",
    sigla: "DZ"
}, {
    nome: "Equador",
    sigla: "EC"
}, {
    nome: "Estônia",
    sigla: "EE"
}, {
    nome: "Egito",
    sigla: "EG"
}, {
    nome: "Eritréia",
    sigla: "ER"
}, {
    nome: "Espanha",
    sigla: "ES"
}, {
    nome: "Etiópia",
    sigla: "ET"
}, {
    nome: "Finlândia",
    sigla: "FI"
}, {
    nome: "Fiji",
    sigla: "FJ"
}, {
    nome: "Micronésia",
    sigla: "FM"
}, {
    nome: "França",
    sigla: "FR"
}, {
    nome: "Gabão",
    sigla: "GA"
}, {
    nome: "Reino Unido",
    sigla: "GB"
}, {
    nome: "Granada",
    sigla: "GD"
}, {
    nome: "Geórgia",
    sigla: "GE"
}, {
    nome: "Gana",
    sigla: "GH"
}, {
    nome: "Gâmbia",
    sigla: "GM"
}, {
    nome: "Guiné",
    sigla: "GN"
}, {
    nome: "Guiné Equatorial",
    sigla: "GQ"
}, {
    nome: "Grécia",
    sigla: "GR"
}, {
    nome: "Guatemala",
    sigla: "GT"
}, {
    nome: "Guiné-Bissau",
    sigla: "GW"
}, {
    nome: "Guiana",
    sigla: "GY"
}, {
    nome: "Honduras",
    sigla: "HN"
}, {
    nome: "Croácia",
    sigla: "HR"
}, {
    nome: "Haiti",
    sigla: "HT"
}, {
    nome: "Hungria",
    sigla: "HU"
}, {
    nome: "Indonésia",
    sigla: "ID"
}, {
    nome: "Irlanda",
    sigla: "IE"
}, {
    nome: "Israel",
    sigla: "IL"
}, {
    nome: "Índia",
    sigla: "IN"
}, {
    nome: "Iraque",
    sigla: "IQ"
}, {
    nome: "Irã",
    sigla: "IR"
}, {
    nome: "Islândia",
    sigla: "IS"
}, {
    nome: "Itália",
    sigla: "IT"
}, {
    nome: "Jamaica",
    sigla: "JM"
}, {
    nome: "Jordânia",
    sigla: "JO"
}, {
    nome: "Japão",
    sigla: "JP"
}, {
    nome: "Quênia",
    sigla: "KE"
}, {
    nome: "Quirguistão",
    sigla: "KG"
}, {
    nome: "Camboja",
    sigla: "KH"
}, {
    nome: "Kiribati",
    sigla: "KI"
}, {
    nome: "Comores",
    sigla: "KM"
}, {
    nome: "São Cristóvão e Nevis",
    sigla: "KN"
}, {
    nome: "República Popular Democrática da Coréia",
    sigla: "KP"
}, {
    nome: "República da Coréia",
    sigla: "KR"
}, {
    nome: "Kuwait",
    sigla: "KW"
}, {
    nome: "Cazaquistão",
    sigla: "KZ"
}, {
    nome: "Laos",
    sigla: "LA"
}, {
    nome: "Líbano",
    sigla: "LB"
}, {
    nome: "Santa Lúcia",
    sigla: "LC"
}, {
    nome: "Liechtenstein",
    sigla: "LI"
}, {
    nome: "Sri Lanka",
    sigla: "LK"
}, {
    nome: "Libéria",
    sigla: "LR"
}, {
    nome: "Lesoto",
    sigla: "LS"
}, {
    nome: "Lituânia",
    sigla: "LT"
}, {
    nome: "Luxemburgo",
    sigla: "LU"
}, {
    nome: "Letônia",
    sigla: "LV"
}, {
    nome: "Líbia",
    sigla: "LY"
}, {
    nome: "Marrocos",
    sigla: "MA"
}, {
    nome: "Mônaco",
    sigla: "MC"
}, {
    nome: "Moldávia",
    sigla: "MD"
}, {
    nome: "Montenegro",
    sigla: "ME"
}, {
    nome: "Madagáscar",
    sigla: "MG"
}, {
    nome: "Ilhas Marshall",
    sigla: "MH"
}, {
    nome: "Macedônia do Norte",
    sigla: "MK"
}, {
    nome: "Mali",
    sigla: "ML"
}, {
    nome: "Mianmar",
    sigla: "MM"
}, {
    nome: "Mongólia",
    sigla: "MN"
}, {
    nome: "Mauritânia",
    sigla: "MR"
}, {
    nome: "Malta",
    sigla: "MT"
}, {
    nome: "Maurício",
    sigla: "MU"
}, {
    nome: "Maldivas",
    sigla: "MV"
}, {
    nome: "Malauí",
    sigla: "MW"
}, {
    nome: "México",
    sigla: "MX"
}, {
    nome: "Malásia",
    sigla: "MY"
}, {
    nome: "Moçambique",
    sigla: "MZ"
}, {
    nome: "Namíbia",
    sigla: "NA"
}, {
    nome: "Níger",
    sigla: "NE"
}, {
    nome: "Nigéria",
    sigla: "NG"
}, {
    nome: "Nicarágua",
    sigla: "NI"
}, {
    nome: "Holanda",
    sigla: "NL"
}, {
    nome: "Noruega",
    sigla: "NO"
}, {
    nome: "Nepal",
    sigla: "NP"
}, {
    nome: "Nauru",
    sigla: "NR"
}, {
    nome: "Nova Zelândia",
    sigla: "NZ"
}, {
    nome: "Omã",
    sigla: "OM"
}, {
    nome: "Panamá",
    sigla: "PA"
}, {
    nome: "Peru",
    sigla: "PE"
}, {
    nome: "Papua Nova Guiné",
    sigla: "PG"
}, {
    nome: "Filipinas",
    sigla: "PH"
}, {
    nome: "Paquistão",
    sigla: "PK"
}, {
    nome: "Polônia",
    sigla: "PL"
}, {
    nome: "Portugal",
    sigla: "PT"
}, {
    nome: "Palau",
    sigla: "PW"
}, {
    nome: "Paraguai",
    sigla: "PY"
}, {
    nome: "Catar",
    sigla: "QA"
}, {
    nome: "Romênia",
    sigla: "RO"
}, {
    nome: "Sérvia",
    sigla: "RS"
}, {
    nome: "Rússia (Federação Russa)",
    sigla: "RU"
}, {
    nome: "Ruanda",
    sigla: "RW"
}, {
    nome: "Arábia Saudita",
    sigla: "SA"
}, {
    nome: "Ilhas Salomão",
    sigla: "SB"
}, {
    nome: "Seichelles",
    sigla: "SC"
}, {
    nome: "Sudão",
    sigla: "SD"
}, {
    nome: "Suécia",
    sigla: "SE"
}, {
    nome: "Singapura",
    sigla: "SG"
}, {
    nome: "Eslovênia",
    sigla: "SI"
}, {
    nome: "Eslováquia",
    sigla: "SK"
}, {
    nome: "Serra Leoa",
    sigla: "SL"
}, {
    nome: "San Marino",
    sigla: "SM"
}, {
    nome: "Senegal",
    sigla: "SN"
}, {
    nome: "Somália",
    sigla: "SO"
}, {
    nome: "Suriname",
    sigla: "SR"
}, {
    nome: "Sudão do Sul",
    sigla: "SS"
}, {
    nome: "São Tomé e Príncipe",
    sigla: "ST"
}, {
    nome: "El Salvador",
    sigla: "SV"
}, {
    nome: "Síria",
    sigla: "SY"
}, {
    nome: "Eswatini",
    sigla: "SZ"
}, {
    nome: "Chade",
    sigla: "TD"
}, {
    nome: "Togo",
    sigla: "TG"
}, {
    nome: "Tailândia",
    sigla: "TH"
}, {
    nome: "Tadjiquistão",
    sigla: "TJ"
}, {
    nome: "Timor Leste",
    sigla: "TL"
}, {
    nome: "Turcomenistão",
    sigla: "TM"
}, {
    nome: "Tunísia",
    sigla: "TN"
}, {
    nome: "Tonga",
    sigla: "TO"
}, {
    nome: "Turquia",
    sigla: "TR"
}, {
    nome: "Trinidad e Tobago",
    sigla: "TT"
}, {
    nome: "Tuvalu",
    sigla: "TV"
}, {
    nome: "Tanzânia",
    sigla: "TZ"
}, {
    nome: "Ucrânia",
    sigla: "UA"
}, {
    nome: "Uganda",
    sigla: "UG"
}, {
    nome: "Estados Unidos da América",
    sigla: "US"
}, {
    nome: "Uruguai",
    sigla: "UY"
}, {
    nome: "Uzbequistão",
    sigla: "UZ"
}, {
    nome: "São Vicente e Granadinas",
    sigla: "VC"
}, {
    nome: "Venezuela",
    sigla: "VE"
}, {
    nome: "Vietnã",
    sigla: "VN"
}, {
    nome: "Vanuatu",
    sigla: "VU"
}, {
    nome: "Samoa",
    sigla: "WS"
}, {
    nome: "Iêmen",
    sigla: "YE"
}, {
    nome: "África do Sul",
    sigla: "ZA"
}, {
    nome: "Zâmbia",
    sigla: "ZM"
}, {
    nome: "Zimbábue",
    sigla: "ZW"
}];

const getOnlyInitials = (countrie) => {
    return countries.find(element => element.nome === countrie).sigla
};

module.exports = { countries, getOnlyInitials };