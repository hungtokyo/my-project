let Vimeo = require('vimeo').Vimeo;
const client_id = '981dcc6abb7f9488fff316001225af8b46c563d5';
const access_token = '843f56fb6ffb438cb22abead9d9f9ca3';
const client_secret = 'i50gc0cayOGH7WMAeWtvRkzucUETGGqaktOVgzkTlShxODElhUlazy+bZoZyWHofefIUxmnnE+FCqw2fZGikLoBXr9MGmv4wGFINXTGqmUsYCwNbyPHD4wmSMfyN647N';
let client = new Vimeo(client_id, client_secret, access_token);
export default client;