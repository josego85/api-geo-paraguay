const Polyglot = require('node-polyglot');
const i18n = require('i18n/index.js');

const { myEs } = i18n;
const { myEn } = i18n;
const languages = {
  es: myEs,
  en: myEn,
};

const getLanguage = (language) => languages[language] || myEn;

const startPolyglot = (req, res, next) => {
  const locale = req.locale.language;

  req.polyglot = new Polyglot();
  req.polyglot.extend(getLanguage(locale));

  next();
};

module.exports = startPolyglot;
