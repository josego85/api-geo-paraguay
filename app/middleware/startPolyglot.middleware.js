const Polyglot = require('node-polyglot');
const i18n = require('i18n/index.js');
const myEs = i18n.myEs;
const myEn = i18n.myEn;
const languages = {
    es: myEs,
    en: myEn,
};

const getLanguage = (language) => {
    return languages[language] || myEn;
};

const startPolyglot = (req, res, next) => {
    const locale = req.locale.language;

    req.polyglot = new Polyglot();
    req.polyglot.extend(getLanguage(locale));

    next();
};

module.exports = startPolyglot;
