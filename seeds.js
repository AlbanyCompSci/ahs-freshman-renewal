var Firebase = require('firebase');
var Config = require('config');

var firebase = new Firebase(Config.FIREBASE_ROOT);

// Debaters ///////////////////////////////////////////////////////////////////
var debaters = firebase.child('debaters');

var tim = debaters.push({
    name: 'Tim Student',
    email: 'TimS9999@ausdk12.org',
});

var alice = debaters.push({
    name: 'Alice Scholar',
    email: 'AliceS4300@ausdk12.org',
});

var jane = debaters.push({
    name: 'Jane Example',
    email: 'JaneE5900@auskd12.org',
});

var bob = debaters.push({
    name: 'Bob Debater',
    email: 'BobD9300@ausdk12.org',
});

var jean = debaters.push({
    name: 'Jean Orator',
    email: 'JeanO6500@ausdk12.org',
});

var john = debaters.push({
    name: 'John Presenter',
    email: 'JohnP11900@ausdk12.org',
});

// Judges /////////////////////////////////////////////////////////////////////
var judges = firebase.child('judges');

var joe = judges.push({
    name: 'Joe Judge',
    email: 'JoeJ4397@ausdk12.org'
});

var susan = judges.push({
    name: 'Susan Senior',
    email: 'SusanS21797@ausdk12.org'
});

// Teachers ///////////////////////////////////////////////////////////////////
var teachers = firebase.child('teachers');

var lent = debaters.push({
    name: 'Robert Lent',
    email: 'rlent@ausdk12.org'
});

var hudson = debaters.push({
    name: 'Mariflorence Hudson',
    email: 'mhudson@ausdk12.org'
});

// Teams //////////////////////////////////////////////////////////////////////
var teams = firebase.child('teams');

var team1 = teams.push({
    debate: 'a',
    name: 'LentP2T3',
    teachers: [lent, hudson],
    debaters: [tim, alice, jane],
    scores: {a: 'c', b: 'a', c: 'a'}
});

var team2 = teams.push({
    debate: 'a',
    name: 'HudsonP1T2',
    teachers: [hudson, lent],
    debaters: [bob, jean, john],
    scores: {a: 'e', b: 'f', c: 'g'}
});

// Locations //////////////////////////////////////////////////////////////////
var locations = firebase.child('locations');

var littleTheater = debates.push('Little Theater');

var library = debates.push('Library');

var multi = debates.push('Multipurpose Room');

// Debates ////////////////////////////////////////////////////////////////////
var debates = firebase.child('debates');

var minimumWage = debates.push({
    title: 'California Minimum Wage',
    location: littleTheater,
    time: (new Date()).now().toIsoString(),
    judges: [joe,susan],
    affTeam: team1,
    negTeam: team2
});

var gmos = debates.push({
    title: 'Should GMO Foods be Labeled',
    location: littleTheater,
    time: (new Date()).now().toIsoString(),
    judges: [joe,susan]
    affTeam: team1,
    negTeam: team2
});
