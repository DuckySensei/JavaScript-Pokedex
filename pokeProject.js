const readline = require("readline");
const https = require("https");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const baseURL = 'https://pokeapi.co/api/v2/';

function showMenu() {
    console.log("\n1. Search for a Pokemon");
    console.log("2. Search for an Item");
    console.log("3. Search for a Move");
    console.log("4. Exit\n");
}

function prompt(cb) {
    rl.question("Enter your choice: ", (input) => {
        cb(input);
    });
}

function searchPoke(term) {
    const url = `${baseURL}pokemon/${term.toLowerCase()}`;
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                printPoke(json);
            } catch (error) {
                console.error("Failed to parse data!");
                run();
            }
        });
    }).on('error', (error) => {
        console.error("Pokemon not found!");
        run();
    });
}

function searchItem(term) {
    const url = `${baseURL}item/${term.toLowerCase()}`;
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                printItem(json);
            } catch (error) {
                console.error("Failed to parse data!");
                run();
            }
        });
    }).on('error', (error) => {
        console.error("Item not found!");
        run();
    });
}

function searchMove(term) {
    const url = `${baseURL}move/${term.toLowerCase()}`;
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                printMove(json);
            } catch (error) {
                console.error("Failed to parse data!");
                run();
            }
        });
    }).on('error', (error) => {
        console.error("Move not found!");
        run();
    });
}
     
function printPoke(json) {
    console.log(`\nName: ${json.name}`);
    console.log(`Weight: ${json.weight}`);
    console.log(`Height: ${json.height}`);
    console.log(`Base Experience: ${json.base_experience}`);
    console.log("Moves:");
    json.moves.forEach((move, index) => {
        if (index < 5) console.log(`- ${move.move.name}`);
    });
    run();
}


function printItem(json) {
    console.log(`\nName: ${json.name}`);
    console.log(`Cost: ${json.cost}`);
    console.log(`Category: ${json.category.name}`);
    console.log(`Effect: ${json.effect_entries[0].effect}`);
    run();
}

function printMove(json) {
    console.log(`\nName: ${json.name}`);
    console.log(`Type: ${json.type.name}`);
    console.log(`Power: ${json.power}`);
    console.log(`PP: ${json.pp}`);
    console.log(`Accuracy: ${json.accuracy}`);
    console.log(`Priority: ${json.priority}`);
    console.log(`Effect: ${json.effect_entries[0].effect}`);
    run();
}

function run() {
    showMenu();
    prompt((choice) => {
        switch(choice) {
            case '1':
                prompt(searchPoke);
                break;
            case '2':
                prompt(searchItem);
                break;
            case '3':
                prompt(searchMove);
                break;
            case '4':
                console.log("Exiting...");
                rl.close();
                break;
            default:
                console.log("Invalid choice, please enter a number between 1 and 4.");
                run();
        }
    });
}

run();

