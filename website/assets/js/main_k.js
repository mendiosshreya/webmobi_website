// scroll function changes navbar
$(document).ready(function(){
    /*$("#main").scroll(function(){
    	alert("scroll");
        $(".navbar-default").css("background-color","white");
        $(".navbar-default").css("top","0%");
    });*/

    $.ajax
      ({  

          url:'http://13.127.189.8:3080/eventlist',
          // url:server_ip+'/get_contact_info_description?contact_information_type_key=email&contact_information_data_description_target=person',
          type:'GET',
          success:function(datago)
          {
              
              console.log(datago);
              if(datago.response == false)
              {
                  alert("Couldn't fetch contact infor types");
              }
              else
              { 
                $("#demo").empty();
                $("#tradeshows").empty(); 

                for(var i=0; i<datago.data.length;i++)
                {
                  var start_date = Date.parse(datago.data[i].Start_date);
                  var date_inmilliseconds = start_date *1;
                  //console.log("milliseconds",date_inmilliseconds);
                 $("#tradeshows").append('<div class="col-sm-3"><div class="popular-events-cell1" id='+datago.data[i].Event_ID+'> <a href="event-details.html#'+datago.data[i].Event_ID+'"><div class="pop-bg-img"> <img src='+datago.data[i].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[i].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[i].Venue+'</h6><h6><i class="far fa-calendar-alt"></i>'+date_day(date_inmilliseconds)+" "+milli_hour(date_inmilliseconds)+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[i].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[i].Category+", "+'#'+datago.data[i].Sub_category+'</h6></div> </a></div></div>')
                 $("#demo").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[i].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[i].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[i].Venue+'</h6><h6><i class="far fa-calendar-alt"></i>'+date_day(date_inmilliseconds)+" "+milli_hour(date_inmilliseconds)+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[i].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[i].Category+", "+'#'+datago.data[i].Sub_category+'</h6></div> </a></div></div></div>');
                }
              }
          },error:function(errdatagc)
          {
              console.log(errdatagc);
          }
      });

    $.ajax
      ({  

          url:'http://13.127.189.8:3080/eventlistmore',
          // url:server_ip+'/get_contact_info_description?contact_information_type_key=email&contact_information_data_description_target=person',
          type:'GET',
          success:function(datago)
          {
              
              console.log(datago);
              if(datago.response == false)
              {
                  alert("Couldn't fetch contact infor types");
              }
              else
              { 
                
                $("#Tradeshows_2").empty();
                for(var j=0; j<datago.data.length;j++)
                {
                  var start_date = Date.parse(datago.data[j].Start_date);
                  var date_inmilliseconds = start_date *1;
                  //console.log("milliseconds",date_inmilliseconds);
                  $("#Tradeshows_2").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[j].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[j].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[j].Venue+'</h6><h6><i class="far fa-calendar-alt"></i>'+date_day(date_inmilliseconds)+" "+milli_hour(date_inmilliseconds)+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[j].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[j].Category+", "+'#'+datago.data[j].Sub_category+'</h6></div> </a></div></div></div>');
                  

                }
              }
          },error:function(errdatagc)
          {
              console.log(errdatagc);
          }
      });
    $.ajax
      ({  

          url:'http://13.127.189.8:3080/eventlistmore',
          // url:server_ip+'/get_contact_info_description?contact_information_type_key=email&contact_information_data_description_target=person',
          type:'GET',
          success:function(datago)
          {
              
              console.log(datago);
              if(datago.response == false)
              {
                  alert("Couldn't fetch contact infor types");
              }
              else
              { 
                
                $("#Tradeshows_3").empty();
                for(var j=0; j<datago.data.length;j++)
                {
                  var start_date = Date.parse(datago.data[j].Start_date);
                  var date_inmilliseconds = start_date *1;
                  //console.log("milliseconds",date_inmilliseconds);
                  $("#Tradeshows_3").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[j].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[j].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[j].Venue+'</h6><h6><i class="far fa-calendar-alt"></i>'+date_day(date_inmilliseconds)+" "+milli_hour(date_inmilliseconds)+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[j].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[j].Category+", "+'#'+datago.data[j].Sub_category+'</h6></div> </a></div></div></div>');
                  

                }
              }
          },error:function(errdatagc)
          {
              console.log(errdatagc);
          }
      });
    $.ajax
      ({  

          url:'http://13.127.189.8:3080/eventlistmore',
          // url:server_ip+'/get_contact_info_description?contact_information_type_key=email&contact_information_data_description_target=person',
          type:'GET',
          success:function(datago)
          {
              
              console.log(datago);
              if(datago.response == false)
              {
                  alert("Couldn't fetch contact infor types");
              }
              else
              { 
                
                $("#Tradeshows_4").empty();
                for(var j=0; j<datago.data.length;j++)
                {
                  var start_date = Date.parse(datago.data[j].Start_date);
                  var date_inmilliseconds = start_date *1;
                  //console.log("milliseconds",date_inmilliseconds);
                  $("#Tradeshows_4").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[j].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[j].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[j].Venue+'</h6><h6><i class="far fa-calendar-alt"></i>'+date_day(date_inmilliseconds)+" "+milli_hour(date_inmilliseconds)+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[j].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[j].Category+", "+'#'+datago.data[j].Sub_category+'</h6></div> </a></div></div></div>');
                  

                }
              }
          },error:function(errdatagc)
          {
              console.log(errdatagc);
          }
      });
    $.ajax
      ({  

          url:'http://13.127.189.8:3080/eventlistmore',
          // url:server_ip+'/get_contact_info_description?contact_information_type_key=email&contact_information_data_description_target=person',
          type:'GET',
          success:function(datago)
          {
              
              console.log(datago);
              if(datago.response == false)
              {
                  alert("Couldn't fetch contact infor types");
              }
              else
              { 
                
                $("#Tradeshows_5").empty();
                for(var j=0; j<datago.data.length;j++)
                {
                  var start_date = Date.parse(datago.data[j].Start_date);
                  var date_inmilliseconds = start_date *1;
                  //console.log("milliseconds",date_inmilliseconds);
                  $("#Tradeshows_5").append('<div class="col-sm-4"><div class="popular-events-cell1"> <a href="event-details.html"><div class="pop-bg-img"> <img src='+datago.data[j].Image_url+'></div><div class="pop-event-cont1"><h5>'+datago.data[j].Event_name+'</h5></div><div class="row pop-event-cont2"><div class="col-sm-8 pop-event-loc-time"><h6><i class="fas fa-map-marker-alt"></i>'+datago.data[j].Venue+'</h6><h6><i class="far fa-calendar-alt"></i>'+date_day(date_inmilliseconds)+" "+milli_hour(date_inmilliseconds)+'</h6></div><div class="col-sm-4 pop-event-price"><h5>'+datago.data[j].Free+'</h5></div></div><div class="pop-event-cont3"><h6>#'+datago.data[j].Category+", "+'#'+datago.data[j].Sub_category+'</h6></div> </a></div></div></div>');
                  

                }
              }
          },error:function(errdatagc)
          {
              console.log(errdatagc);
          }
      });
    if(window.location.pathname.indexOf("event-details.html") >= 0 )
      {
        var id = window.location.href.split('#').pop(); 
        //console.log("id",id);
        $.ajax
          ({  

              url:'http://13.127.189.8:3080/eventid/'+id,
              type:'GET',
              success:function(datago)
              {
                  
                  console.log(datago);
                  if(datago.response == false)
                  {
                      alert("Couldn't fetch contact infor types");
                  }
                  else
                  { 
                    $("#event_details").empty();
                    for(var i=0; i<datago.data.length;i++)
                    { 
                      var  imageUrl = datago.data[i].Image_url;
                      $("#event_details").append('<div class="header-wrapper-event-det"><div class="container-fluid header-wrapper-event-det-inner"></div></div><div class="event-det-cont"><div class="row event-det"><div class="col-sm-4 event-det-sec1"><div class="event-det-sec1-1"><h3>'+datago.data[i].Event_name+'</h3><h5>#'+datago.data[i].Category+", "+'#'+datago.data[i].Sub_category+'</h5><h6><i class="fas fa-map-marker-alt"></i> '+datago.data[i].Venue+'</h6><h6>22/08/2018 7:00 AM - 23/08/2018 7:00 PM</h6> <button class="btn interestedbtn" data-toggle="modal" data-target="#intrst">INTERESTED</button><div class="event-det-share-sec1"><div class="row"><div class="col-sm-2 offset-sm-3 event-det-social"><h5>Share:</h5></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-facebook-f"></i></a></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-twitter"></i></a></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-linkedin-in"></i></i></a></div><div class="col-sm-1 event-det-social"> <a href=""><i class="fab fa-google-plus-g"></i></i></a></div></div></div></div><div class="event-det-sec1-2"><h4>Organiser Details</h4> <img class="event-det-org-pic" src="'+datago.data[i].O_Image_URL+'"><h5>'+datago.data[i].Organiser_name+'</h5> <button type="button" class="btn sendmessage">SEND MESSAGE</button></div></div><div class="col-sm-8 event-det-sec2"><div class="event-det-heading"><ul class="nav"><li class="nav-item"><a href="#overview" class="nav-link">OVERVIEW</a></li><li class="nav-item"><a href="#tickets" class="nav-link">TICKETS</a></li><li class="nav-item"><a href="#venue" class="nav-link">VENUE</a></li></ul></div><div class="event-det-overview" id="overview"><h2>OVERVIEW</h2><h4>'+datago.data[i].Description+'</h4></div><div class="event-det-tickets" id="tickets"><h2>TICKETS</h2><h4>Tickets for "'+datago.data[i].Event_name+'" can be purchased here.</h4> <button type="button" class="btn booknow">BOOK NOW</button></div><div class="event-det-venue" id="venue"><h2>VENUE</h2><h4>'+datago.data[i].Venue+'</h4> <div id="map"></div></div></div></div></div>');
                      $('.header-wrapper-event-det').css('background-image', 'url(' + imageUrl + ')'); 
                           var line1  = datago.data[i].Venue;
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
                  
                    }
                  }
              },error:function(errdatagc)
              {
                  console.log(errdatagc);
              }
          });
      }
    $(window).scroll(function()
    {
  	   handleTopNavAnimation();
  	 });

    
});

$(window).load(function()
   {
     handleTopNavAnimation();
   });
function handleTopNavAnimation() 
   {

       var top=$(window).scrollTop();
       if(top>10)
       {
	   	//alert("scroll");
           $('#Navigation').addClass('navbar-solid'); 
           $("#create_event").show();
           $("#login").hide();
       }
       else
       {
           $('#Navigation').removeClass('navbar-solid'); 
           $("#login").show();
           $("#create_event").hide();
       }
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