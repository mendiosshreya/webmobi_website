// scroll function changes navbar
 var pg_no_trade=1;
 var pg_no_conf=1;
 var pg_no_all=1;
 var country_array=[];
 var location_array=[];
 var filter_startdate;
 var filter_enddate;
 
$(document).ready(function(){
  //Shreya 29-06-18

   $("#search_events").keypress(function(event)
    {
     
       if (event.keyCode==13)
       {
         index_search();
      
        }
      });  

   $('#down').click(function() {
    // $('#display_advance').toggle('1000');
    $("i", this).toggleClass("fas fa-caret-down fas fa-caret-up");
    $("#all_country").toggle();
    });


   $('#down_l').click(function() {
    $("i", this).toggleClass("fas fa-caret-down fas fa-caret-up");
    $("#all_location").toggle();
    });
   
    $('#down_cat').click(function() {
    $("i", this).toggleClass("fas fa-caret-down fas fa-caret-up");
    $("#all_category").toggle();
    });


    $('#down_date').click(function() {
    $("i", this).toggleClass("fas fa-caret-down fas fa-caret-up");
    $("#all_date").toggle();
    });

    //  $("#up_date").click(function()
    // {
    //   // alert();
    //   $("#all_date").hide();
    // });


    $("#search_events_name").keypress(function(event)
    {
     
       if (event.keyCode==13)
       {
         search_events_name(this);
      
        }
      });  

     if(window.location.href.indexOf("event-details.html") >= 0 )
    {
       // userid='';
       var event_appid = window.location.href.split('#').pop();
       console.log(event_appid);
        $.ajax({
            type:'POST',
            data:{"userid":"32dfa84844d9de66e4c77fc71cbdb5bd","appid":event_appid},
            url: ' http://104.131.76.15:3000/api/event/getEvent',
                        success: function(event_details) {

                         var start_date = Date.parse(event_details.events[0].start_date);
                         var date_inmilliseconds_sd = start_date *1;
                         var end_date = Date.parse(event_details.events[0].end_date);
                         var date_inmilliseconds_ed = end_date *1;
                         
                          console.log(event_details);
                          // var sd=new Date(event_details.events[0].start_date);
                          // var ed=new Date(event_details.events[0].end_date);
                          $(".header-wrapper-event-det").css("background-image", "url('"+event_details.events[0].app_image+"')");
                          $('.event-det-cont').append('<div class="row event-det"><div class="col-sm-4 event-det-sec1"><div class="event-det-sec1-1"><h3>'+event_details.events[0].app_name+'</h3><h5>#'+event_details.events[0].app_category+' #tags #tags</h5><h6><i class="fas fa-map-marker-alt"></i>'+event_details.events[0].location+'</h6><h6>'+date_day(date_inmilliseconds_sd)+" "+milli_hour(date_inmilliseconds_sd)+'-'+date_day(date_inmilliseconds_ed)+" "+milli_hour(date_inmilliseconds_ed)+'</h6> <button class="btn interestedbtn" data-toggle="modal" data-target="#intrst">INTERESTED</button><div class="event-det-share-sec1"><div class="row"><div class="col-sm-2 offset-sm-3 event-det-social"><h5>Share:</h5></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-facebook-f"></i></a></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-twitter"></i></a></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-linkedin-in"></i></i></a></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-google-plus-g"></i></i></a></div></div></div></div><div class="event-det-sec1-2"><h4>Organiser Details</h4> <img class="event-det-org-pic"><h5>Organiser Name</h5> <button type="button" class="btn sendmessage">SEND MESSAGE</button></div></div><div class="col-sm-8 event-det-sec2"><div class="event-det-heading"><ul class="nav"><li class="nav-item"><a href="#overview" class="nav-link">OVERVIEW</a></li><li class="nav-item"><a href="#tickets" class="nav-link">TICKETS</a></li><li class="nav-item"><a href="#venue" class="nav-link">VENUE</a></li></ul></div><div class="event-det-overview" id="overview"><h2>OVERVIEW</h2><h4>'+event_details.events[0].app_description+'</h4></div><div class="event-det-tickets" id="tickets"><h2>TICKETS</h2><h4>Tickets for "'+event_details.events[0].app_name+'" can be purchased here.</h4> <button type="button" class="btn booknow">BOOK NOW</button></div><div class="event-det-venue" id="venue"><h2>VENUE</h2><h4>'+event_details.events[0].location+'</h4><div id="map"> <img  class="img-responsive"></div></div></div></div>');
                          $('.modal-dialog').append('<div class="modal-content"><div class="modal-header text-center"><h4 class="modal-title">'+event_details.events[0].app_name+'</h4> <button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><div class="form-group event-det-modal"> <i class="fas fa-user"></i> <input type="text" class="form-control event-det-username" id="usrname" placeholder="Full Name"></div><div class="form-group event-det-modal"> <i class="fas fa-map-marker-alt"></i> <input type="text" class="form-control event-det-username" id="loc" placeholder="Your City ( Start typing to see option )"></div><div class="form-group event-det-modal"> <i class="fas fa-building"></i> <input type="text" class="form-control event-det-username" id="company" placeholder="Company"></div> <span class="individual"> <label class="form-check-label" style="margin-top: -10%;"> <input type="checkbox" class="form-check-input" value=""> Individual </label> </span><div class="form-group event-det-modal"> <i class="fas fa-briefcase"></i> <input type="text" class="form-control event-det-username" id="designation" placeholder="Designation"></div><div class="form-group event-det-modal"> <i class="fas fa-mobile-alt"></i> <input type="text" class="form-control event-det-username" id="mobno" placeholder="Mobile number"></div><div class="submit-btn"> <button type="submit" class="btn submit1" data-dismiss="modal">SUBMIT</button></div></div></div>');
                           
                           var line1  = event_details.events[0].location;
                           console.log(line1);
                           $("#map").css({ "width": "100%", "height": "400px" })
                           var address = line1 ;

                              var map = new google.maps.Map(document.getElementById('map'), { 
                                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                                  zoom: 13
                              });

                              var geocoder = new google.maps.Geocoder();

                              geocoder.geocode({
                                 'address': address
                           }, 
                           function(results, status) {
                               if(status == google.maps.GeocoderStatus.OK) {
                                new google.maps.Marker({
                                       position: results[0].geometry.location,
                                       map: map
                                    });
                                    map.setCenter(results[0].geometry.location);
                               }
                            });
                          },error:function(errdatagc)
                        {
                          console.log(errdatagc);
                        }        
              });  
    
    }

    if(window.location.href.indexOf("trade-shows.html") >= 0 )
    {
       // alert();
       var search_input = window.location.href.split('#').pop();


    console.log(search_input);
    if(search_input=='')
    {
      Redirect();
    }

      $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/event_search?q='+search_input+'',
                        success: function(search_result) {
                          // alert();
                          console.log(search_result);
                          console.log(search_result.response);
                           
                          // $("#all_events_content").empty();
                          // $('#all_display').empty();
                          // $('#trade_display').empty();
                          // $('#conf_display').empty();
                          if(search_result.response==true)
                           { 
                                for(var i=0; i<search_result.events.length;i++)
                                {
                                   var loc=search_result.events[i].location;
                                   if (loc.length >40)
                                   loc= loc.substring(0,40)+'...';
                                   var entry_fee_search=parseInt(search_result.events[i].entry_fee);
                                   // console.log(entry_fee_trade);
                                   if(entry_fee_search==0)
                                     var entry_fee_text_search="Free";
                                   else
                                     var entry_fee_text_search="Paid";  
                                 var sd=new Date(search_result.events[i].start_date);
                                 $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+search_result.events[i].appid+'"><div class="pop-bg-img2"> <img src='+search_result.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+search_result.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_search+'</h5></div></div><div class="pop-event-cont3"><h6>#'+search_result.events[i].app_category+", "+'#'+search_result.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                                    
                                }
                            }  

                            // else
                            //   alert("No events found!");

                             
                          
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }        
      }); 
       // console.log(eid);
       

    }



 if(window.location.href.indexOf("trade-shows.html") >= 0 )
    {
       // alert();
       pg_no_trade=1;
       var target= window.location.href.split('#').pop();
       if(target=="tradeshows_view")
       {
        // alert();
        display_tradeshows(this);
         // alert("target");
       
       // // display_tradeshows(this);
        // $.ajax({
        //     type: 'GET',
        //     url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=tradeshow&page_number='+pg_no_trade+'',
            
        //     // url: 'http://139.59.56.245:3080/tradeshows/?pretty',
        //                 success: function(datago_trade) {
                         
        //                   console.log(datago_trade);
        //                   console.log(datago_trade.events.length);
        //                   $("#all_display").empty();
        //                   for(var i=0; i<datago_trade.events.length;i++)
        //                   {
        //                            var loc=datago_trade.events[i].location;
        //                            if (loc.length >40)
        //                            loc= loc.substring(0,40)+'...';
        //                            var entry_fee_trade=parseInt(datago_trade.events[i].entry_fee);
        //                            // console.log(entry_fee_trade);
        //                            if(entry_fee_trade==0)
        //                              var entry_fee_text_trade="Free";
        //                            else
        //                              var entry_fee_text_trade="Paid"; 

        //                            var con_sd = new Date(datago_trade.events[i].start_date);
        //                            $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+datago_trade.events[i].appid+'"><div class="pop-bg-img2"> <img src='+datago_trade.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+datago_trade.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+con_sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_trade+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago_trade.events[i].app_category+", "+'#'+datago_trade.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
        //                    }
        //                   $("#all_display").append('<div class="row container-fluid prev_next "><button id="prev" type="button" class="prev_next_buttons" onclick="display_tradeshows(this)">Previous<i class="fas fa-arrow-left"></i></button><button id="next" type="button" class="prev_next_buttons" onclick="display_tradeshows(this)">Next<i class="fas fa-arrow-right"></i></button></div>'); 
        //                 },error:function(errdatagc)
        //                 {
        //                   console.log(errdatagc);
        //                 }        
        //       });  
      }
    }
  
  if(window.location.href.indexOf("trade-shows.html") >= 0 )
    {
       // alert();
       pg_no_conf=1;
       var target= window.location.href.split('#').pop();
       if(target=="conferences_view")
       {
         // alert("target");
       
       // // display_tradeshows(this);
      $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=conference&page_number='+pg_no_conf+'',
            
            // url: 'http://139.59.56.245:3080/tradeshows/?pretty',
                        success: function(datago_conf) {
                         
                          console.log(datago_conf);
                          console.log(datago_conf.events.length);
                          $("#conf_display").empty();
                          for(var i=0; i<datago_conf.events.length;i++)
                          {
                                   var loc=datago_conf.events[i].location;
                                   if (loc.length >40)
                                   loc= loc.substring(0,40)+'...';
                                   var entry_fee_conf=parseInt(datago_conf.events[i].entry_fee);
                                   // console.log(entry_fee_trade);
                                   if(entry_fee_conf==0)
                                     var entry_fee_text_conf="Free";
                                   else
                                     var entry_fee_text_conf="Paid";  
                                   var con_sd=new Date(datago_conf.events[i].start_date);
                                   // console.log(con_sd);
                                  // const parts = con_sd.split(/[- :]/);
                                  // const formatted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}`;
                                  

                               //$("#tradeshows").empty();
                               // var all_countries = datago.data[i].truename;
                               // $("#all_country").append('<ul class="count-list"><li><a href="#">'+all_countries+'</a></li></ul>');
                                // var date = datago.data[i].Start_date *1
                               //$("#tradeshows").append('<div class="col-sm-3"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[i].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[i].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[i].Venue+'</h6><h6><i class="far fa-calendar-alt"></i> 30-Jan-2018 7:00 AM</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[i].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[i].Category+", "+'#'+datago.data[i].Sub_category+'</h6></div> </a></div></div>')
                               $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+datago_conf.events[i].appid+'"><div class="pop-bg-img2"> <img src='+datago_conf.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+datago_conf.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+con_sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_conf+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago_conf.events[i].app_category+", "+'#'+datago_conf.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                            

                           }
                          $("#all_display").append('<div class="row container-fluid prev_next "><button id="prev" type="button" class="prev_next_buttons" onclick="display_conferences(this)"><i class="fas fa-arrow-left"></i>Previous</button><button id="next_conf" type="button" class="prev_next_buttons" onclick="display_conferences(this)">Next<i class="fas fa-arrow-right"></i></button></div>'); 
                        },error:function(errdatagc)
                        {
                          console.log(errdatagc);
                        }        
              });  
      }
    }


  

  $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=tradeshow',
                        success: function(tradeshows) {
                              var loc1=tradeshows.events[0].location;
                              if (loc1.length >50)
                              loc1= loc1.substring(0,50)+'...';

                               var loc2=tradeshows.events[1].location;
                               // console.log(loc2.length);
                               if (loc2.length > 40)
                               loc2= loc2.substring(0,40)+'...';
                    
                              var trade1_sd=new Date(tradeshows.events[0].start_date);
                              var entry_fee1=tradeshows.events[0].entry_fee;
                              if(entry_fee1==0)
                                 var entry_fee1_text="Free";
                              else
                                var entry_fee1_text="Paid";   
                              // if(entry_fee1==)
                              // trade1_sd=stringify(trade1_sd).split(0,21);
                              // const parts1 = trade1_sd.split(/[- :]/);
                              // const formatted1 = `${parts1[2]}/${parts1[1]}/${parts1[0]} ${parts1[3]}:${parts1[4]}`;
                              var trade2_sd=new Date(tradeshows.events[1].start_date);
                              var entry_fee2=tradeshows.events[1].entry_fee;
                              if(entry_fee2==0)
                                 var entry_fee2_text="Free";
                              else
                                var entry_fee2_text="Paid"; 
                              
                              var imageUrl1=tradeshows.events[0].app_image;
                              var imageUrl2=tradeshows.events[1].app_image;
                              $('#trade1').append('<div class="popular-events-cell1"> <a href="event-details.html#'+tradeshows.events[0].appid+'"><div id="pop-bg-img1" class="pop-bg-img"> <img src="' + imageUrl1 + '"></div><div id="pop-event-cont1" class="pop-event-cont1"><h5>'+tradeshows.events[0].app_name+'</h5></div><div class="row pop-event-cont2"><div id="pop-event-loc-time1" class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+ loc1+'</h6><h6><i class="far fa-calendar-alt"></i>'+trade1_sd+'</h6></div><div id="pop-event-price1" class="col-sm-4 pop-event-price"><h5>'+entry_fee1_text+'</h5></div></div><div id="hashtag1" class="pop-event-cont3"><h6>#'+tradeshows.events[0].app_category+', #'+tradeshows.events[0].app_sub_category+'</h6></div> </a></div>');
                              $('#trade2').append('<div class="popular-events-cell1"> <a href="event-details.html#'+tradeshows.events[1].appid+'"><div id="pop-bg-img2" class="pop-bg-img"> <img src="' + imageUrl2 + '"></div><div id="pop-event-cont2" class="pop-event-cont1"><h5>'+tradeshows.events[1].app_name+'</h5></div><div class="row pop-event-cont2"><div id="pop-event-loc-time2" class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+ loc2+'</h6><h6><i class="far fa-calendar-alt"></i>'+trade2_sd+'</h6></div><div id="pop-event-price2" class="col-sm-4 pop-event-price"><h5>'+entry_fee2_text+'</h5></div></div><div id="hashtag2" class="pop-event-cont3"><h6>#'+tradeshows.events[1].app_category+', #'+tradeshows.events[1].app_sub_category+'</h6></div> </a></div>');
                              // console.log(a);
                              // $("#trade1").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+tradeshows.events[0].appid+'"><div class="pop-bg-img2"> <img src='+tradeshows.events[0].app_image+'></div><div class="pop-event-cont1"><h5>'+tradeshows.events[0].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc1+'</h6><h6><i class="far fa-calendar-alt"></i> '+tradeshows.events[0].start_date+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee1_text+'</h5></div></div><div class="pop-event-cont3"><h6>#'+tradeshows.events[0].app_category+", "+'#'+tradeshows.events[0].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                              // $('#trade1').append('<a href="event-details.html"><div id="pop-bg-img1" class="pop-bg-img"> <img src="assets/img/aggregate/pop-bg.png"></div><div id="pop-event-cont1" class="pop-event-cont1"></div><div class="row pop-event-cont2"><div id="pop-event-loc-time1" class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i> Location</h6><h6><i class="far fa-calendar-alt"></i> 30-Jan-2018 7:00 AM</h6></div><div id="pop-event-price1" class="col-sm-4 pop-event-price"><h5>$ 1600</h5></div></div><div id="hashtag1" class="pop-event-cont3"><h6>#school, #event, #education</h6></div> </a>');
                              // $("#pop-bg-img1").append('<div><img src="' + imageUrl1 + '"></div>');
                              // $("#pop-event-cont1").append('<h5>'+tradeshows.events[0].app_name+'</h5>');    
                              // $("#pop-event-price1").append('<h5>'+entry_fee1_text+'</h5>'); 
                              // $("#pop-event-loc-time1").append('<h6><i class="fas fa-map-marker-alt">'+loc1+'</i></h6><h6><i class="far fa-calendar-alt">'+trade1_sd+'</i></h6>'); 
                              // $("#hashtag1").append('<h6>#'+tradeshows.events[0].app_category+", "+'#'+tradeshows.events[0].app_sub_category+'</h6>');
                             
                              // $("#pop-bg-img2").append('<div><img src="' + imageUrl2 + '"></div>');
                              // $("#pop-event-cont2").append('<h5>'+tradeshows.events[1].app_name+'</h5>');    
                              // $("#pop-event-price2").append('<h5>'+entry_fee2_text+'</h5>'); 
                              // $("#pop-event-loc-time2").append('<h6 class="non"><i class="fas fa-map-marker-alt">'+loc2+'</i></h6><h6><i class="far fa-calendar-alt">'+trade2_sd+'</i></h6>'); 
                              // $("#hashtag2").append('<h6>#'+tradeshows.events[1].app_category+", "+'#'+tradeshows.events[1].app_sub_category+'</h6>');
                             
                              
    },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });

  $.ajax({
    type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=conference',
                        success: function(conferences) {
                              
                              var imageUrl3=conferences.events[0].app_image;
                              var imageUrl4=conferences.events[1].app_image;

                              var loc3=conferences.events[0].location;
                              if (loc3.length >50)
                              loc3= loc3.substring(0,50)+'...';

                              var loc4=conferences.events[1].location;
                              if (loc4.length >50)
                              loc4= loc4.substring(0,50)+'...';

                              var con1_sd=new Date(conferences.events[0].start_date);
                              var entry_fee3=conferences.events[0].entry_fee;
                              if(entry_fee3==0)
                                 var entry_fee3_text="Free";
                              else
                                var entry_fee3_text="Paid"; 
                              // const parts1 = trade1_sd.split(/[- :]/);
                              // const formatted1 = `${parts1[2]}/${parts1[1]}/${parts1[0]} ${parts1[3]}:${parts1[4]}`;
                              var con2_sd=new Date(conferences.events[1].start_date);
                              var entry_fee4=conferences.events[1].entry_fee;
                              if(entry_fee4==0)
                                 var entry_fee4_text="Free";
                              else
                                var entry_fee4_text="Paid"; 
                              // const parts2 = trade2_sd.split(/[- :]/);
                              // const formatted2 = `${parts2[2]}/${parts2[1]}/${parts2[0]} ${parts2[3]}:${parts2[4]}`;
                              $('#conf1').append('<div class="popular-events-cell1"> <a href="event-details.html#'+conferences.events[0].appid+'"><div id="pop-bg-img3" class="pop-bg-img"> <img src="' + imageUrl3 + '"></div><div id="pop-event-cont3" class="pop-event-cont1"><h5>'+conferences.events[0].app_name+'</h5></div><div class="row pop-event-cont2"><div id="pop-event-loc-time3" class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc3+'</h6><h6><i class="far fa-calendar-alt"></i>'+con1_sd+'</h6></div><div id="pop-event-price3" class="col-sm-4 pop-event-price"><h5>'+entry_fee3_text+'</h5></div></div><div id="hashtag3" class="pop-event-cont3"><h6>#'+conferences.events[0].app_category+', #'+conferences.events[0].app_sub_category+'</h6></div> </a></div>');
                              $('#conf2').append('<div class="popular-events-cell1"> <a href="event-details.html#'+conferences.events[1].appid+'"><div id="pop-bg-img3" class="pop-bg-img"> <img src="' + imageUrl4 + '"></div><div id="pop-event-cont3" class="pop-event-cont1"><h5>'+conferences.events[1].app_name+'</h5></div><div class="row pop-event-cont2"><div id="pop-event-loc-time3" class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc4+'</h6><h6><i class="far fa-calendar-alt"></i>'+con2_sd+'</h6></div><div id="pop-event-price3" class="col-sm-4 pop-event-price"><h5>'+entry_fee4_text+'</h5></div></div><div id="hashtag3" class="pop-event-cont3"><h6>#'+conferences.events[1].app_category+', #'+conferences.events[1].app_sub_category+'</h6></div> </a></div>');
                              
                              
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });

$.ajax({
    type: 'GET',
            url: 'http://139.59.56.245:3080/freq_country?pretty',
                        success: function(fcountry) {
                              for(var i=0;i<fcountry.data.length;i++)
                              {
                                 $('#all_country').append('<div><input type="checkbox" name="country" value="'+fcountry.data[i].Country+'">'+fcountry.data[i].Country+'</div>');
                              }

                              $('#all_country').append('<button type="button" class="view" data-toggle="modal" data-target="#myModal" >View All</button><div id="myModal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">All Countries</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><div id="filter_all_countries" class="row count-list"></div></div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal" onclick="add_to_filter()">Done</button></div></div></div></div></a>');
                              },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });



$.ajax({
    type: 'GET',
            url: 'http://139.59.56.245:3080/freq_city?pretty',
                        success: function(fcity) {
                          // console.log(fcity.data.length);
                              for(var i=0;i<fcity.data.length;i++)
                              {
                                 $('#all_location').append('<div><input type="checkbox" name="location" value="'+fcity.data[i].City+'">'+fcity.data[i].City+'</div>');
    
                              }
                             
                              // $('#all_location').append('<button type="button" class="view" data-toggle="modal" data-target="#myModal2">View All</button><div id="myModal2" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">All Locations</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><div id="filter_all_locations" class="row count-list"></div></div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal" onclick="filter()">Filter</button></div></div></div></div></a>');
                        $('#all_location').append('<button type="button" class="view" data-toggle="modal" data-target="#myModal2">View All</button><div id="myModal2" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">All Locations</h4><button type="button" class="btn btn-default filter_top" data-dismiss="modal" onclick="add_to_filter()">Done</button> <button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name"><ul id="myUL"></ul></div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal" onclick="add_to_filter()">Done</button></div></div></div></div>');
                        
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });

$.ajax({
    type: 'GET',
            url: 'http://139.59.56.245:3080/freq_category?pretty',
                        success: function(fcategory) {
                              for(var i=0;i<fcategory.data.length;i++)
                              {
                                 $('#all_category').append('<div><input type="checkbox" name="category" value="'+fcategory.data[i].Format+'">'+fcategory.data[i].Format+'</div>');
                              }
                              $('#all_category').append('<button type="button" class="view" data-toggle="modal" data-target="#category_modal">View All</button><div id="category_modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">All Categories</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><div id="filter_all_categories" class="row count-list"></div></div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal" onclick="add_to_filter()">Done</button></div></div></div></div></a>');
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });

  $.ajax({
    type: 'GET',
            url: 'http://139.59.56.245:3080/all_country?pretty',
                        success: function(all_country) {
                                                          // console.log("sellength"+selected.length);
                              
                              for(var i=0;i<all_country.data.length;i++)
                              {
                                // console.log(all_country.data[i].Country);
                                  
                                $('#filter_all_countries').append('<div class="col-sm-4"><input type="checkbox" name="country" value="'+all_country.data[i].Country+'">'+all_country.data[i].Country+'</div>');
                              
                              }
                              
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });


  $.ajax({
    type: 'GET',
            url: 'http://139.59.56.245:3080/all_city?pretty',
                        success: function(all_city) {
                          // console.log(all_city.data.length);
                              for(var i=0;i<all_city.data.length;i++)
                              {
                                // console.log(all_city.data[i].City);
                                // $('#filter_all_locations').append('<div class="col-sm-4"><input type="checkbox" name="location" value="'+all_city.data[i].City+'">'+all_city.data[i].City+'</div>');
                              $("#myUL").append('<li><a href="#"><input type="checkbox" name="location" value="'+all_city.data[i].City+'">'+all_city.data[i].City+'</a></li>');

                              }
                              
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });
  $.ajax({
    type: 'GET',
            url: 'http://139.59.56.245:3080/all_category?pretty',
                        success: function(all_category) {
                              for(var i=0;i<all_category.data.length;i++)
                              {
                                // console.log(all_category.data[i].Format);
                                $('#filter_all_categories').append('<div class="col-sm-4"><input type="checkbox" name="location" value="'+all_category.data[i].Format+'">'+all_category.data[i].Format+'</div>');
                              }
                              // $('#all_country').append('<li><a href="#">View All</a></li>');
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });   

  
  
                          
    /*$("#main").scroll(function(){
    	alert("scroll");
        $(".navbar-default").css("background-color","white");
        $(".navbar-default").css("top","0%");
    });*/
    $(window).scroll(function()
	   {
	       handleTopNavAnimation();
	   });

    $("#circle1").hover(function(){
      $("#circle_head").hide();
      $("#circle_text").show();
      $("#circle1").css("background-color","rgba(37,177,277,1)");
      $("#circle1").css("transition","0.5s ease");
    },function(){
      $("#circle_head").show();
      $("#circle_text").hide();
      $("#circle1").css("background-color","rgba(37,177,277,0.5)");
    })
    $("#circle2").hover(function(){
      $("#circle_head2").hide();
      $("#circle_text2").show();
      $("#circle2").css("background-color","rgba(37,177,277,1)");
      $("#circle2").css("transition","0.5s ease");
    },function(){
      $("#circle_head2").show();
      $("#circle_text2").hide();
      $("#circle2").css("background-color","rgba(37,177,277,0.5)");
    })
    $("#circle3").hover(function(){
      $("#circle_head3").hide();
      $("#circle_text3").show();
      $("#circle3").css("background-color","rgba(37,177,277,1)");
      $("#circle3").css("transition","0.5s ease");
    },function(){
      $("#circle_head3").show();
      $("#circle_text3").hide();
      $("#circle3").css("background-color","rgba(37,177,277,0.5)");
    })
    $("#circle4").hover(function(){
      $("#circle_head4").hide();
      $("#circle_text4").show();
      $("#circle4").css("background-color","rgba(37,177,277,1)");
      $("#circle4").css("transition","0.5s ease");
    },function(){
      $("#circle_head4").show();
      $("#circle_text4").hide();
      $("#circle4").css("background-color","rgba(37,177,277,0.5)");
    })
});

function Redirect()
{
   window.location="trade-shows.html";
}

function dummy()
{
  alert();
}

function search_events()
{
    // alert();
    var search_input=$("#search_events").val();
    console.log(search_input);
    if(search_input=='')
    {
      Redirect();
    }
      $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/event_search?q='+search_input+'',
                        success: function(search_result) {
                          console.log(search_result);
                          $('#all_display').empty();
                          $('#trade_display').empty();
                          $('#conf_display').empty();
                          for(var i=0; i<search_result.events.length;i++)
                          {
                             var loc=search_result.events[i].location;
                             if (loc.length >40)
                             loc= loc.substring(0,40)+'...';
                             var entry_fee_search=parseInt(search_result.events[i].entry_fee);
                             // console.log(entry_fee_trade);
                             if(entry_fee_search==0)
                               var entry_fee_text_search="Free";
                             else
                               var entry_fee_text_search="Paid";  
                             var sd=new Date(search_result.events[i].start_date);
                           $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+search_result.events[i].appid+'"><div class="pop-bg-img2"> <img src='+search_result.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+search_result.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_search+'</h5></div></div><div class="pop-event-cont3"><h6>#'+search_result.events[i].app_category+", "+'#'+search_result.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                          }
                          
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }        
      });  
}


// $(window).load(function()
//  {
//    handleTopNavAnimation();
//  });


function handleTopNavAnimation() 
   {

       var top=$(window).scrollTop();
       if(top>10)
       {
	   	//alert("scroll");
           $('#mainNavigation').addClass('navbar-solid'); 
       }
       else
       {
           $('#mainNavigation').removeClass('navbar-solid'); 
       }
   }

function display_tradeshows(e)
{
  
  var action=e.id;
  // console.log("HI");  
  console.log(action); 
                
  if((action=="trade_main") || (action==undefined))
         pg_no_trade=1;
  else
   {      
       if(action=="next")
       
         ++pg_no_trade;
       
       else
       {
         if(pg_no_trade!=1)
           pg_no_trade--;    
       }
  }
  // console.log(pg_no);
  
  $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=tradeshow&page_number='+pg_no_trade+'',
            
            // url: 'http://139.59.56.245:3080/tradeshows/?pretty',
                        success: function(datago_trade) {
                         
                          console.log(datago_trade);
                          console.log(datago_trade.events.length);
                          $("#trade_display").empty();
                          for(var i=0; i<datago_trade.events.length;i++)
                          {
                                   var loc=datago_trade.events[i].location;
                                   if (loc.length >40)
                                   loc= loc.substring(0,40)+'...';
                                   var entry_fee_trade=parseInt(datago_trade.events[i].entry_fee);
                                   // console.log(entry_fee_trade);
                                   if(entry_fee_trade==0)
                                     var entry_fee_text_trade="Free";
                                   else
                                     var entry_fee_text_trade="Paid";  
                                   var con_sd=new Date(datago_trade.events[i].start_date);
                                   $("#trade_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+datago_trade.events[i].appid+'"><div class="pop-bg-img2"> <img src='+datago_trade.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+datago_trade.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+con_sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_trade+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago_trade.events[i].app_category+", "+'#'+datago_trade.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                           }
                          $("#trade_display").append('<div class="row container-fluid prev_next "><button id="prev" type="button" class="prev_next_buttons" onclick="display_tradeshows(this)">Previous<i class="fas fa-arrow-left"></i></button><button id="next" type="button" class="prev_next_buttons" onclick="display_tradeshows(this)">Next<i class="fas fa-arrow-right"></i></button></div>'); 
                        },error:function(errdatagc)
                        {
                          console.log(errdatagc);
                        }        
              });  
                        
}

function display_conferences(e)
{
  // console.log(e.id);
  var action=e.id;
// console.log(action);
 if(action=="conf_main")
       pg_no_conf=1;
 else
 {      
     if(action=="next_conf")
     
       ++pg_no_conf;
     
     else
     {
       if(pg_no_conf!=1)
         pg_no_conf--;    
     }
}
// console.log(pg_no_conf);
  $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=conference&page_number='+pg_no_conf+'',
            
            // url: 'http://139.59.56.245:3080/tradeshows/?pretty',
                        success: function(datago_conf) {
                         
                          console.log(datago_conf);
                          console.log(datago_conf.events.length);
                          $("#conf_display").empty();
                          for(var i=0; i<datago_conf.events.length;i++)
                          {
                                   var loc=datago_conf.events[i].location;
                                   if (loc.length >40)
                                   loc= loc.substring(0,40)+'...';
                                   var entry_fee_conf=parseInt(datago_conf.events[i].entry_fee);
                                   // console.log(entry_fee_trade);
                                   if(entry_fee_conf==0)
                                     var entry_fee_text_conf="Free";
                                   else
                                     var entry_fee_text_conf="Paid";  
                                   var con_sd=new Date(datago_conf.events[i].start_date);
                                   // console.log(con_sd);
                                  // const parts = con_sd.split(/[- :]/);
                                  // const formatted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}`;
                                  

                               //$("#tradeshows").empty();
                               // var all_countries = datago.data[i].truename;
                               // $("#all_country").append('<ul class="count-list"><li><a href="#">'+all_countries+'</a></li></ul>');
                                // var date = datago.data[i].Start_date *1
                               //$("#tradeshows").append('<div class="col-sm-3"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[i].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[i].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[i].Venue+'</h6><h6><i class="far fa-calendar-alt"></i> 30-Jan-2018 7:00 AM</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[i].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[i].Category+", "+'#'+datago.data[i].Sub_category+'</h6></div> </a></div></div>')
                               $("#conf_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+datago_conf.events[i].appid+'"><div class="pop-bg-img2"> <img src='+datago_conf.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+datago_conf.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+con_sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_conf+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago_conf.events[i].app_category+", "+'#'+datago_conf.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                            

                           }
                          $("#conf_display").append('<div class="row container-fluid prev_next "><button id="prev_conf" type="button" class="prev_next_buttons" onclick="display_conferences(this)">Previous<i class="fas fa-arrow-left"></i></button><button id="next_conf" type="button" class="prev_next_buttons" onclick="display_conferences(this)">Next<i class="fas fa-arrow-right"></i></button></div>'); 
                        },error:function(errdatagc)
                        {
                          console.log(errdatagc);
                        }        
              });  
                        
                         
}




function trade_conferences(e)
{
   // alert();
  var action=e.id;                   
  if(action=="all_main")
         pg_no_all=1;
   else
   {      
       if(action=="next_all")
       
         ++pg_no_all;
       
       else
       {
         if(pg_no_all!=1)
           pg_no_all--;    
       }
  }
  // console.log(pg_no_all);

     $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/discovery_web_events?type=all&page_number='+pg_no_all+'',
            
                        success: function(datagoall) {
                         
                          console.log(datagoall);
                          $("#all_display").empty();
                          // $("#trade_display").empty();
                          // $("#conf_display").empty();
                              for(var i=0; i<datagoall.events.length;i++){
                                  var loc=datagoall.events[i].location;
                                  if (loc.length >40)
                                  loc= loc.substring(0,40)+'...';
                                  var con_sd=new Date(datagoall.events[i].start_date);
                                  var entry_fee_all=parseInt(datagoall.events[i].entry_fee);
                                   // console.log(entry_fee_all);
                                  if(entry_fee_all==0)
                                     var entry_fee_text_all="Free";
                                  else
                                     var entry_fee_text_all="Paid";
                                  // var con_sd=datagoall.events[i].start_date.replace('Z', '').replace('T', ' ');
                                  // const parts = con_sd.split(/[- :]/);
                                  // const formatted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}`;
                                  $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+datagoall.events[i].appid+'"><div class="pop-bg-img2"> <img src='+datagoall.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+datagoall.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+con_sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_all+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datagoall.events[i].app_category+", "+'#'+datagoall.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                              }
                              $("#all_display").append('<div class="row container-fluid prev_next "><button id="prev_all" type="button" class="prev_next_buttons" onclick="trade_conferences(this)">Previous<i class="fas fa-arrow-left"></i></button> <button id="next_all" type="button" class="prev_next_buttons" onclick="trade_conferences(this)">Next<i class="fas fa-arrow-right"></i></button></div>'); 
                        

                          // }
                        },error:function(errdatagc)
                        {
                          console.log(errdatagc);
                        }        
              });  

}

// function display_all_countries()
// {
//   $.ajax({
//     type: 'GET',
//             url: 'http://139.59.56.245:3080/all_country?pretty',
//                         success: function(all_country) {
//                                                          // console.log("sellength"+selected.length);
                             
//                               for(var i=0;i<all_country.data.length;i++)
//                               {
//                                 console.log(all_country.data[i].Country);
                                 
//                                 $('#filter_all_countries').append('<li><input type="checkbox" name="country" value="'+all_country.data[i].Country+'">'+all_country.data[i].Country+'</li>');
                              
//                               }
                              
//                         },error:function(errdatagc)
//             {
//                 console.log(errdatagc);
//             }                             
    
//   });
// }
function display_all_locations()
{
  $.ajax({
            type: 'GET',
            url: 'http://139.59.56.245:3080/all_city?pretty',
                        success: function(all_city) {
                          console.log(all_city.data.length);
                              for(var i=0;i<all_city.data.length;i++)
                              {
                                console.log(all_city.data[i].City);
                                $('#filter_all_locations').append('<li><input type="checkbox" name="location" value="'+all_city.data[i].City+'">'+all_city.data[i].City+'</li>');
                              }
                              
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });
}
function display_all_categories()
{
  $.ajax({
            type: 'GET',
            url: 'http://139.59.56.245:3080/all_category?pretty',
                        success: function(all_category) {
                              for(var i=0;i<all_category.data.length;i++)
                              {
                                console.log(all_category.data[i].Format);
                                $('#filter_all_categories').append('<li><input type="checkbox" name="location" value="'+all_category.data[i].Format+'">'+all_category.data[i].Format+'</li>');
                              }
                              // $('#all_country').append('<li><a href="#">View All</a></li>');
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }                             
    
  });
}

function search_events_name(e)
{
      var search_input=$("#search_events_name").val();
      console.log(search_input);
      if(search_input=='')
          Redirect();
      $.ajax({
            type: 'GET',
            url: 'http://104.131.76.15:3000/api/event/event_search?q='+search_input+'',
                        success: function(search_result) {
                          console.log(search_result);
                          $('#all_display').empty();
                          $('#trade_display').empty();
                          $('#conf_display').empty();
                          for(var i=0; i<search_result.events.length;i++)
                          {
                             var loc=search_result.events[i].location;
                             if (loc.length >40)
                             loc= loc.substring(0,40)+'...';
                             var entry_fee_search=parseInt(search_result.events[i].entry_fee);
                             // console.log(entry_fee_trade);
                             if(entry_fee_search==0)
                               var entry_fee_text_search="Free";
                             else
                               var entry_fee_text_search="Paid";  
                             var sd=new Date(search_result.events[i].start_date);
                           $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+search_result.events[i].appid+'"><div class="pop-bg-img2"> <img src='+search_result.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+search_result.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_search+'</h5></div></div><div class="pop-event-cont3"><h6>#'+search_result.events[i].app_category+", "+'#'+search_result.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                          }
                          
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }        
      });  
}
function index_search()
{   var search_input=$("#search_events").val();
    if(search_input=='')
        window.location="index.html";
    else  
        window.location="trade-shows.html#"+search_input+"";
    // alert(search_input);
    // console.log(search_input);
    

     // console.log(search_input);
}
function add_to_filter()
{
  var selected_country=$("input:checkbox[name=country]:checked");
  var selected_location=$("input:checkbox[name=location]:checked");

  // for(var i=0;i<selected_country.length;i++)
  // {
  //   var sel_value_country=$(selected_country[i]).val();
  //   country_array.push(sel_value_country);
  // }
  
  // filter();
  // console.log(selected_country[0].value());
      // if(selected_country.length>0)
      // {
      //   country_array.pop();
      // }
}

function filter()
{    
      
    
      var selected_country=$("input:checkbox[name=country]:checked");
     

      var selected_location=$("input:checkbox[name=location]:checked");
      //  if(selected_location.length>0)
      // {
      //   location_array.pop();
      // }
      // var selected_category=$("input:checkbox[name=category]:checked");

      var selected_startdate=$('#filter_startdate').val();
      if(selected_startdate!='')
      {
         filter_startdate=selected_startdate;
      }
      
      var selected_enddate=$('#filter_enddate').val();
       if(selected_startdate!='')
      {
         filter_startdate=selected_enddate;
      }


      for(var i=0;i<selected_country.length;i++)
       {
        var sel_value_country=$(selected_country[i]).val();
        country_array.push(sel_value_country);
        // console.log(sel_value_country);
       }  
    


       for(var i=0;i<selected_location.length;i++)
       {
        var sel_value_location=$(selected_location[i]).val();
        location_array.push(sel_value_location);
       }  
       // for(var i=0;i<selected_category.length;i++)
       // {
       //  var sel_value_category=$(selected_category[i]).val();
       //  category_array.push(sel_value_category);
       //  // console.log(sel_value_category);
       // }  
       var country = JSON.stringify(country_array);
       var locat   = JSON.stringify(location_array);
       console.log(country_array);
       console.log(location_array);
       // console.log(country);
       // console.log(locat);

       $.ajax({

         type: 'POST',
         url: 'http://104.131.76.15:3000/api/event/filter_event',
         data:{"country":country,"location":locat,"date":"anydate","category":"anycategory"},
          success: function(filter) {
            // console.log(filter.events.length);
            console.log(filter);
            // if(filter.response=="true")
            // {
                for(var i=0;i<filter.events.length;i++)
                {
                  var loc=filter.events[i].location;
                   if (loc.length >40)
                   loc= loc.substring(0,40)+'...';
                   var entry_fee_filter=parseInt(filter.events[i].entry_fee);
                   // console.log(entry_fee_trade);
                   if(entry_fee_filter==0)
                     var entry_fee_text_filter="Free";
                   else
                     var entry_fee_text_filter="Paid";  
                   var sd=new Date(filter.events[i].start_date);
                  $("#all_display").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html#'+filter.events[i].appid+'"><div class="pop-bg-img2"> <img src='+filter.events[i].app_image+'></div><div class="pop-event-cont1"><h5>'+filter.events[i].app_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+loc+'</h6><h6><i class="far fa-calendar-alt"></i> '+sd+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+entry_fee_text_filter+'</h5></div></div><div class="pop-event-cont3"><h6>#'+filter.events[i].app_category+", "+'#'+filter.events[i].app_sub_category+'</h6></div> </a></div></div></div>');
                              
                }
              // } 
              // else
              // {
                // alert("No events found!!!")
              // } 
          },error:function(errdatagc)
            {
              console.log(errdatagc);
            }      
       });
}

function milli_hour(date_inmilliseconds)
  {
      var a = new Date(date_inmilliseconds);
      var c = "";
      if(a.getHours()>12) 
      {
          if(a.getMinutes() == 0)
          {
             c = (a.getHours()-12)+":"+"00"+" pm"; 
          }
          else
          {
              c = (a.getHours()-12)+":"+a.getMinutes()+" "+" pm";
          }
      }
      else if(a.getHours()==12) 
      {
          if(a.getMinutes() == 0)
          {
             c = a.getHours()+":"+"00"+" pm"; 
          }
          else
          {
              c = a.getHours()+":"+a.getMinutes()+" "+" pm";
          }
      }
      else if(a.getHours()<12) 
      {
          if(a.getMinutes() == 0)
          {
             c = a.getHours()+":"+"00"+" am"; 
          }
          else
          {
              c = a.getHours()+":"+a.getMinutes()+" "+" am";
          }
      }
      return c;
  }


function date_day(date_inmilliseconds)
  {
      //new Date(results.enddate + timezone + 19800000);
      var a = new Date(date_inmilliseconds);
      var c = "";
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      c = a.getDate()+" "+monthNames[a.getMonth()]+" "+a.getFullYear();
      return c;
  }