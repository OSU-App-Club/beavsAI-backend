import { Router } from 'express';

let router = Router();
let connectionTracker = {}

/*
 * This middleware function will log all requests to the console.
 * It will also keep track of the number of times a user has visited a route.
 * This will be useful for debugging and understanding how Beavs.ai 
 * is being used by the frontend and AI service(s).
 */

router.all('*', function (req, res, next) {
      let counter = connectionTracker[req.originalUrl];
      if (counter || counter === 0) {
            connectionTracker[req.originalUrl] = counter + 1;
      } else {
            connectionTracker[req.originalUrl] = 1;
      }
      console.log('========REQUEST RECEIVED========');
      console.log(`REQUEST ROUTE:  ${JSON.stringify(req.originalUrl, null, '  ')}`);
      console.log(`REQUEST METHOD:  ${JSON.stringify(req.method, null, '  ')}`);
      console.log(`REQUEST BODY:  ${JSON.stringify(req.body, null, '  ')}`);
      console.log(`STATUS CODE:  ${JSON.stringify(req.statusCode, null, '  ')}`);
      console.log(`REQUEST HEADERS:  ${JSON.stringify(req.headers, null, '  ')}`);
      console.log(`SESSION VISITS: ${JSON.stringify(connectionTracker, null, '  ')}`);
      next();
});

export default router;
