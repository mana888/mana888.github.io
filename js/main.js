
const clipboard = function(text, event) {
    const cb = new ClipboardJS(".hide_text",{
        text: function() {
            return text
        }
    });
    cb.on("success", (function(e) {
        cb.off("error"),
        cb.off("success")
    }
    )),
    cb.on("error", (function(e) {
        cb.off("error"),
        cb.off("success")
    }
    )),
    cb.onClick(event)
}



$( document ).ready(function() {
    $(".open").on("click", function() {
        $(".popup-overlay").addClass("active");
        $('.popup-container').css('display', 'block');
        $('.popup-container').animate({
            bottom: "0",
            duration:'slow'
        },'linear');
    });
    //removes the "active" class to .popup and .popup-container when the "Close" button is clicked 
    $(".close").on("click", function() {
        $(".popup-overlay").removeClass("active");
        $('.popup-container').animate({
            bottom: "-90%",
            duration:'slow'
        },'linear');
    });
});



