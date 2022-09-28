const QuoteContainer = document.getElementById('quotecontainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const Twitterbtn = document.getElementById('twitter');
const newQuotetxt = document.getElementById('new-quote');
const loader = document.getElementById('loader');
// Loading Loader
function showloadingspiner(){
    loader.hidden = false;
    QuoteContainer.hidden = true;
}
// Removing Loader
function removingloadingspiner(){
    if(!loader.hidden){
        QuoteContainer.hidden = false;
        loader.hidden = true;
    }
}




async function getQuote() {
    showloadingspiner();
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const api = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxy + api);
        const data = await response.json();

        if(data.quoteAuthor === ""){
            authorText.innerHTML = "Unknow";
        }
        else{
            authorText.innerHTML = data.quoteAuthor;
        }

        if(data.quoteText.length < 50){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }


        quoteText.innerHTML = data.quoteText;
        removingloadingspiner();
        throw new Error('Opps somethig is worong!');
    }
    catch (error) {
        setInterval(() => {
            getQuote();
        }, 20000);
        console.log("Wooops,no quote", error);
    }
}

function quotetweet()
{
    const author = authorText.innerHTML;
    const quote = quoteText.innerHTML;
    const twitterurl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterurl,'_blank');

}

function call1(){
    console.log("Callled")
setTimeout(getQuote, 100);
}
// Evet Listner
// document.getElementById('new-quote').addEventListener('click',getQuote)
Twitterbtn.addEventListener('click',quotetweet);

