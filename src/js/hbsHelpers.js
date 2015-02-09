/*global Handlebars*/
var moment = require('moment');

function getDurationObj(durationInMilliseconds) {
  'use strict';
  var dur = moment.duration(durationInMilliseconds, 'ms');
  return {
    duration: dur,
    hrs: dur.get('h'),
    min: dur.get('m'),
    sec: dur.get('s'),
    ms: dur.get('ms')
  };
}

Handlebars.registerHelper('getPlural', function (context) {
  'use strict';
  return context === 1 ? '' : 's';
});

Handlebars.registerHelper('formatSummaryDuration', function (context) {
  'use strict';
  var dur = getDurationObj(context);
  if (dur.hrs  < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return context;
      }
      return dur.sec + '.' + dur.ms;
    }
    return dur.min + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec);
  }
  return dur.hrs + ':' + (dur.min < 10 ? ('0' + dur.min) : dur.min);
});

Handlebars.registerHelper('getSummaryDurationUnits', function (context) {
  'use strict';
  var dur = getDurationObj(context);
  if (dur.hrs  < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return 'MS';
      }
      return 'S';
    }
    return 'M';
  }
  return 'H';
});

Handlebars.registerHelper('formatDuration', function (context) {
  'use strict';
  var dur = getDurationObj(context);
  if (dur.hrs  < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return context + ' ms';
      }
      return dur.sec + '.' + dur.ms + ' s';
    }
    return dur.min + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec) + '.' + dur.ms + ' m';
  }
  return dur.hrs + ':' + (dur.min < 10 ? ('0' + dur.min) : dur.min) + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec) + '.' + dur.ms + ' h';
});

Handlebars.registerHelper('dateFormat', function(context, format) {
  'use strict';
  if (format === 'fromNow') {
    return moment(context).fromNow();
  } else {
    return moment(context).format(format);
  }
});