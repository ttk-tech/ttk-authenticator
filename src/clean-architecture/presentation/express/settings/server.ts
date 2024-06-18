import { app } from './app'
import '../../../../config/logging';
import { server } from '../../../../config/config';

/**
 * Port number for the server to listen on.
 * Default is 3000, can be overridden with the PORT environment variable.
 */

/**
 * Start the server and listen on the specified port.
 */
app.listen(server.SERVER_PORT || 3000, () => {
  logging.log('----------------------------------------');
  logging.log(`🚀 ${server.SERVER_HOSTNAME} server started on ${server.SERVER_PORT}`);
  logging.log('----------------------------------------');
})


