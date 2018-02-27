$(function () {
    let totalSavings = 0;
    function populateYear(total) {
        let yearTotal = (total * 52).toFixed(2);

        $("#yearResult").html(`$${yearTotal}`);
    }
    function animateNumber(numberToAddorSubtract, time, operation, elementName) {
        let mainInterval = setInterval(function () {
            if (numberToAddorSubtract > 0) {
                if (operation === "-") {
                    totalSavings = (totalSavings - .01);
                    // Below if statement prevents the negative symbol from generating

                    if (numberToAddorSubtract > 0.01) {
                        $(`#${elementName}`).html(`$${totalSavings.toFixed(2)}`);
                    } else {
                        if (totalSavings < 0) {
                            totalSavings = Math.round(totalSavings);
                        }
                        $(`#${elementName}`).html(`$${totalSavings}`);
                    }

                } else if (operation === "+") {
                    totalSavings = (totalSavings + .01);
                    $(`#${elementName}`).html(`$${totalSavings.toFixed(2)}`);
                }

                $(`#${elementName}`).html(`$${totalSavings.toFixed(2)}`);
                numberToAddorSubtract = numberToAddorSubtract - .01;
                if (numberToAddorSubtract < .10 && numberToAddorSubtract > 0) {
                    clearInterval(mainInterval);
                    populateYear(totalSavings);
                    animateNumber(numberToAddorSubtract.toFixed(2), 80, operation, elementName);

                } else if (numberToAddorSubtract === 0) {
                    populateYear(totalSavings);
                    clearInterval(mainInterval);
                }
            }
        }, time);

    }

    $(".shopping").on("click", function () {
        let savings = $(this).attr("data-cost-savings").slice(2);
        if ($(this).hasClass("addBubble")) {
            $(this).addClass("subtractBubble");
            $(this).removeClass("addBubble");
            let compareSavings = parseFloat(savings);
            animateNumber(compareSavings, 30, "-", "total")
        } else {
            $(this).addClass("addBubble");
            $(this).removeClass("subtractBubble");
            let compareSavings = parseFloat(savings);
            animateNumber(compareSavings, 30, "+", "total");
        }
    });
});