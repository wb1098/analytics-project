//JavaScript Document

//requirements
/*
   - Total time spent on page

    - What percentage of the page was viewed
        - If they scroll down, and then back up, record the furthest down they ever scrolled

- Time spent hovering the mouse over each element on the page. 

   - How many vowels were typed into the text area
   - Count all the text that was typed, not just what ends up in the text-area
   - If they left the page by clicking a link, record which link they clicked. 

- When the user leaves the page, console.log all the metrics you've collected. (use the unload() event to run a calback function)
*/


$(document).ready(function (event) {
    let timeOnPageStart = null;
    let oneMinute = 1000 * 60;
    var leavingAddress = null;
    var vowelCnt = null;
    var totalKeyCnt = 0;
    var hoveringTime = 0;

    timeOnPageStart = Date.now();


    $(window).on('beforeunload', function (event) {
        var leavingTime = event.timeStamp;
        var scrollTopVal = event.target.scrollingElement.scrollTop;

        console.log((leavingTime / oneMinute).toFixed(2), 'Minutes on Page');
        console.log(`They scrolled ${scrollTopVal} pixels down the page`)

        var scrollPerc = (100 * (scrollTopVal / event.target.scrollingElement.scrollTopMax)).toFixed(2);
        console.log('Scroll Percentage: ', scrollPerc + '%');

        if (vowelCnt > 0) {
            console.log(vowelCnt, ': Vowel(s) key were pushed and ' + totalKeyCnt + ' keys were pushed in total');
        } else {
            console.log('No vowel keys were pushed and ' + totalKeyCnt + ' keys were pushed in total')
        }

        if (!isNaN(hoveringTime)) {
            console.log('Total time spent hovering: ', hoveringTime.toFixed(2) + ' seconds');
        } else {
            console.log('Hovering Time was not a number.')
        }

        if (leavingAddress) {
            console.log('They went to: ', leavingAddress);
        } else {
            console.log('Waiting for them to leave.')
        }

    });

    $(window).keyup(function (event) {
        var vowelArr = ['a', 'e', 'i', 'o', 'u'];
        if (vowelArr.includes(event.key)) {
            vowelCnt++;
        }
        totalKeyCnt++;

    });

    $('.hoverTimer').hover(
        function () {
            $(this).data('inTime', new Date().getTime());
        },
        function () {
            var leaving = new Date().getTime();
            if (leaving > 0) {
                hoveringTime += (leaving - $(this).data('inTime')) / 1000;
            } else {
                hoveringTime = 0;
            }

        }
    );

    $('.leavingMe').click(function () {
        leavingAddress = $(this).attr('href');
    });

});
