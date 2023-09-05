// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function (){
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  function updateBlockColors() {
    const currentHour = dayjs().hour();

    $('.time-block').each (function() {
      const blockHour = parseInt ($ (this). attr ('id').split('-')[1]);
      
      if (blockHour < currentHour){
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour === currentHour ){
        $(this).addClass('present').removeClass('past future');
      } else{
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  function loadEvents(){
    $('.time-block').each(function(){
      const eventId = $(this).attr('id');
      const savedEvent = localStorage.getItem(eventId);

      if (savedEvent){
        $(this).find('textarea').val(savedEvent);
      }

    });
  }

  $('.saveBtn').on('click', function(){
    const eventId = $(this).parent().attr('id');
    const eventText = $(this).siblings('textarea').val();
    localStorage.setItem(eventId,eventText);
  });

  updateBlockColors();
  loadEvents();
  setInterval(updateBlockColors, 60000);
});


