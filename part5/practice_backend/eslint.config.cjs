const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      // Reglas base recomendadas por ESLint
      ...js.configs.recommended.rules,

      // Usa 2 espacios para la indentación
      indent: ['error', 2],

      // Obliga a usar comillas simples en vez de dobles
      quotes: ['error', 'single'],

      // Prohíbe el uso de punto y coma al final de cada línea
      semi: ['error', 'never'],

      // No permite espacios dentro de corchetes de arrays: [1, 2] ✅ / [ 1, 2 ] ❌
      'array-bracket-spacing': ['error', 'never'],

      // Obliga a dejar un espacio dentro de llaves de objetos: { foo: 'bar' } ✅ / {foo:'bar'} ❌
      'object-curly-spacing': ['error', 'always'],

      // Prohíbe poner comas al final de objetos o arrays
      'comma-dangle': ['error', 'never'],

      // Fuerza el uso de saltos de línea estilo Unix (LF), no Windows (CRLF)
      'linebreak-style': ['error', 'unix'],

      // Obliga a usar === y !== en lugar de == y !=
      eqeqeq: 'error',

      // No permite espacios en blanco al final de las líneas
      //'no-trailing-spaces': 'error',

      // Obliga a poner un espacio antes y después de la flecha en funciones flecha: (x) => x ✅
      'arrow-spacing': ['error', { before: true, after: true }],
   
      // ✅ Permite usar console.log (desactiva advertencia)
      'no-console': 0                                   
    }
  }
]