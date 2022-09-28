const QuoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const Twitterbtn = document.getElementById('twitter');
const newQuotetxt = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    QuoteContainer.hidden = true;
}

function complete(){
    if(!loader.hidden){
        QuoteContainer.hidden = false;
        loader.hidden = true;
    }
}


async function getQuote() {
    loading();
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

        complete();
    }
    catch (error) {
        getQuote();
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
// Evet Listner
document.getElementById('new-quote').addEventListener('click',getQuote);
Twitterbtn.addEventListener('click',quotetweet);

