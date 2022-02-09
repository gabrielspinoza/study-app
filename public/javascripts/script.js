// global variables
let selectedDeckId,
    selectedCardId,
    d_name,
    c_question,
    c_answer,
    cardNo = 1,
    container = [],
    cardCount;

let question = document.getElementById("question"),
    questionCount = document.getElementById("questionNo"),
    textField = document.getElementById("text-field"),
    submitButton = document.getElementById("button"),
    currentCard= document.getElementById('deckCard'),
    cardImg = document.getElementById('cardImg'),
    score = 0;


function getDeckCards(){
    let questions = container;
    $.ajax({'async': false ,url:`/getdeckcards/${d_name}`,type: "GET",dataType: 'json', success:function(rows) {
        results = rows.cards.rows;
        for(x = 0; x < results.length; x++){
            questions.push(results[x])
        }
    }});
    // console.log(container);
    return questions;
}


function setupQuiz(){
    container = getDeckCards();
    console.log(container);
    console.log(container.length);
    cardCount = container.length;

    $('#cardstable').find('tbody').html('');

    textField.style.display = '';
    submitButton.style.display = '';

    if(container.length != 0){
        question.innerHTML = container[0].question;
        questionCount.innerHTML = "Question " + cardNo;
        cardImg.src = `${container[0].img_path}`;
        textField.value = '';  
    }else{
        questionCount.innerHTML = "You're done!";
        question.innerHTML = "Your score is: " + score + "/" + cardCount;
        textField.style.display = 'none';
        submitButton.style.display = 'none';
    }
}

function nextCard(){
    container.shift()
    if(container.length != 0){
        currentCard.classList.add('myCard');
        question.innerHTML = results[0].question;
        questionCount.innerHTML = "Question " + cardNo;
        cardImg.src = `${container[0].img_path}`;
        textField.value = '';  
    }else{
        cardNo = 1;
        questionCount.innerHTML = "You're done!";
        question.innerHTML = "Your score is: " + score + "/" + cardCount;
        cardImg.style.display = 'none';
        textField.style.display = 'none';
        submitButton.style.display = 'none';
    }

}

function submitAns(){
    console.log(container);
    console.log(textField.value);
    checkAns(textField.value);
    cardNo++;
    currentCard.classList.remove('myCard');
    nextCard();
}

function checkAns(ans){
    if(ans === container[0].answer){
        score = score + 1;
    }
}


textField.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
      submitAns()
    }
});


// test json
// https://raw.githubusercontent.com/wilsonestelle85/wilsonestelle85.github.io/main/pets1.json

// buttons & user actions

// loads the decks table
$("#openDecks").click(function() {
    loadDeckTable();
});

// deletes the selected deck
$("#deletedeck").click(function() {
    deleteDeck(selectedDeckId);
    removeDeckRow();
});

// loads the cards table
$("#editdeck").click(function() {
    loadCardTable();
}); 

// deletes the selected deck
$("#deletecard").click(function() {
    deleteCard(selectedDeckId, selectedCardId);
    removeCardRow();
});

// highlight active row on decks table
$('#deckHistory').on('click', '.table-row', function(event) {
    $(this).addClass('active').siblings().removeClass('active');
});

// highlight active row on cards table
$('#cardstable').on('click', '.table-row', function(event) {
    $(this).addClass('active').siblings().removeClass('active');
});

// action just before new card is submitted or submit button is clicked
$('#newcard').submit(function() {  
    // close modal (it has to be done after submit cuz it will remove the did value too !!!)
    // $("#closemodal").click();

    return true; // return false to cancel form action
});

// submit button of 
$('#newdeck').submit(function(e) {
    e.preventDefault(); // don't submit multiple times
    this.submit(); // use the native submit method of the form element
    loadDeckTable();
    // $('#imagefile').val(''); // blank the input
});

// action when the close modal button is clicked
$("#closemodal").click(function(){
    // if($('#newcard'.find('did'))) {
        $('#did').remove();

        // and reload cards
    // }
});

// every time a row is select get deck name & did
$("#deckHistory").on("click",".table-row", function() {
    if($('#deckHistory').find('tr').hasClass('active')) {
        // get deck name
        d_name = $(".active > .d_name").text();
        console.log(d_name);
        // get deck id
        selectedDeckId = getDid(d_name);
    }     
});

// every time a row is select get card question & cid
$("#cardstable").on("click",".table-row", function() {
    if($('#cardstable').find('tr').hasClass('active')) {
        // get question
        c_question = $(".active > .c_question").text();
        // get answer
        c_answer = $(".active > .c_answer").text();
        // get cid
        selectedCardId =  getCid(selectedDeckId, c_question, c_answer);
    }
});

// when addnewcard is clicked append the current did
$("#addnewcard").click(function(){
    // append did (inside ajax, since ajax doesnt return value fast and outside code is executed before did has a defined value)
    $('#newcard').append('<input id="did" type="hidden" name="did" value="'+selectedDeckId+'"/>');
    // increment deck
    incrementDeck(selectedDeckId);
    // value of selectedDeckId will be undefined as ajax request finish after this code below is executed.
    // console.log(selectedDeckId +" did");
});


function loadDeckHistory() {
    var table = $('#deckHistory')
    table.find('tbody').html('')

    $.ajax({url: "/getdecks/decks",type: "GET",dataType: 'json', success: function(rows) {
        // console.log("My data" + JSON.stringify(req.body));
        console.log(rows.decks.rows);
        let result = rows.decks.rows;

        if (result.length > 0) {
            // If returned json data is not empty
            var i = 1;
            // looping the returned data
            Object.keys(result).map(k => {
                console.log(result[k].d_name);
                // creating new table row element
                var tr = $('<tr class="table-row">')
                    // first column data
                tr.append('<td class="py-1 px-2 text-center" scope="row">' + (i++) + '</td>')
                    // second column data
                tr.append('<td class="py-1 px-2 text-center d_name">' + result[k].d_name + '</td>')
                    // third column data
                tr.append('<td class="py-1 px-2 text-center">' + result[k].d_total_cards + '</td>')
                // close div
                tr.append('</tr>')
                // Append table row item to table body
                table.find('tbody').append(tr)
            })
        } else {
            console.log('deck json array empty');
        }
    }});
}

function loadCardTable() {
    var table = $('#cardstable')
    table.find('tbody').html('')

    $.ajax({url: `/getdeckcards/${d_name}`,type: "GET",dataType: 'json', success: function(rows) {
        let result = rows.cards.rows;
        console.log(result);
        if (result.length > 0) {
            // If returned json data is not empty
            var i = 1;
            // looping the returned data
            Object.keys(result).map(k => {
                // creating new table row element
                var tr = $('<tr class="table-row">')
                    // first column data
                tr.append('<td class="py-1 px-2 text-center" scope="row">' + (i++) + '</td>')
                    // second column data
                tr.append('<td class="py-1 px-2 text-center"> <img src="' + result[k].img_path + '" class="img-thumbnail" width="100px" alt="' + result[k].img_path + '"> </td>')
                    // third column data
                tr.append('<td class="py-1 px-2 text-center c_question">' + result[k].question + '</td>')
                // 4th
                tr.append('<td class="py-1 px-2 text-center c_answer">' + result[k].answer + '</td>')
                    // close div
                    tr.append('</tr>')
                // Append table row item to table body
                table.find('tbody').append(tr)
            })
        } else {
            console.log('card json array empty');
        }
    }});
}


function removeDeckRow() {
    $("#deck_rows").find(".active").remove();
    // $(`td:contains(${d_name})`).parent().find(active).remove();
}

function removeCardRow() {
    $("#card_rows").find(".active").remove();
}

// REST API - QUERIES

// how to return values from ajax function?
// https://stackoverflow.com/questions/16805306/jquery-return-ajax-result-into-outside-variable

// gets did
function getDid(d_name) {
    var tmp = null;
    $.ajax({'async': false, url: `/getdeckid/${d_name}`,type: "GET",dataType: 'json', success: function(rows) {
        tmp = rows.decks.rows[0].did;
        console.log("current did = " + tmp);
    }});
    return tmp;
};

// gets cid
// cons: cards with same question on same deck, will return multiple records (should return only one)
function getCid(did, question, answer) {
    var q = question.replaceAll(" ", "-").replaceAll("?", "_");
    var a = answer.replaceAll(" ", "-").replaceAll("?", "_");
    var tmp = null;
    $.ajax({'async': false, url: `/getcardid/${did}/${q}/${a}`,type: "GET",dataType: 'json', success: function(rows) {
        console.log(rows);
        tmp = rows.cards.rows[0].cid;
        console.log("current cid = " + tmp);
    }});
    return tmp;
};

// increment deck
function incrementDeck(did){
    $.ajax({url: `/incrementdeck/${did}`,type: "GET", success: function(rows) {}});
};

// deletes deck
function deleteDeck(did) {
    // due to foreign-key first we empty the deck then the deck can be removed
    $.ajax({url: `/deletecards/${did}`,type: "GET", success: function(rows) {}});
    $.ajax({url: `/deletedeck/${did}`,type: "GET", success: function(rows) {
        // after ajax is complete
    }});
};

// deletes card
function deleteCard(did, cid) {
    $.ajax({url: `/deletecard/${cid}`,type: "GET", success: function(rows) {
    }});
    $.ajax({url: `/decrementdeck/${did}`,type: "GET", success: function(rows) {
        // after ajax is complete
    }});
};