const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env se existir
dotenv.config();

const targetPath = './src/environments/environment.ts';

// Verifica se o arquivo já existe
if (fs.existsSync(targetPath)) {
  console.log(`Arquivo já existe em: ${targetPath}. Nenhuma ação necessária.`);
} else {
  // Garante que o diretório exista
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Defina se é produção via variável de ambiente NODE_ENV ou outra
  const isProduction = process.env.NODE_ENV === 'prod';

  const envConfigFile = `export const environment = {
  production: ${isProduction},
  newsApi: {
    host: "${process.env["NEWS_API_HOST"] || ''}",
    apiKey: "${process.env["NEWS_API_KEY"] || ''}",
  },
};
`;

  fs.writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error('Erro ao gerar environment.ts:', err);
    } else {
      console.log(`Arquivo environment.ts gerado em: ${targetPath}`);
    }
  });
}
