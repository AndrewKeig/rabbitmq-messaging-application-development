module.exports.Init = function(example){
    console.log('');
    console.log('');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('- RabbitMQ Messaging Application Development.   -');
    console.log('- Packt Publishing.                             -');
    console.log('- Andrew Keig.                                  -');
    console.log('- ' + example +'                 -');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - ');
    console.log('');

    console.log("+---+   +---+");
    console.log("|   |   |   |");
    console.log("|   |   |   |");
    console.log("|   |   |   |");
    console.log("|   +---+   +-------+");
    console.log("|                   |");
    console.log("| RabbitMQ  +---+   |");
    console.log("|           |   |   |");
    console.log("|           +---+   |");
    console.log("|                   |");
    console.log("+-------------------+");


    //http://hjzhao.blogspot.co.uk/2012/05/first-error-with-nodejs.html
    process.on('SIGINT', function() {
        process.exit(1);
    });

    process.on('SIGTSTP', function() {
        process.exit(1);
    });

    process.on('SIGTERM', function(){
        process.exit(1);
    });
};