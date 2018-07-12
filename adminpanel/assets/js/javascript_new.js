var XW = {
  msg: 'xlsx',
  rABS: 'js-xlsx-master/./xlsxworker2.js'
}
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
var page_number=1;
var no_of_pages=1;
var total_records=0;
$(document).ready(function()
{

    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
    });

    $("#search_bar").keypress(function(event)
    {
    if (event.keyCode==13)
    {
      var search_input=$("#search_bar").val();
      if(search_input=='')
          Redirect();
      $.ajax({
            type: 'GET',
            url: 'http://139.59.56.245:3080/search/'+search_input+'?pretty',
                        success: function(search_result) {
                          $("#view_records").hide();
                          // $("#save_all").hide();
                          $("#limit").hide();
                          $("#prev").hide();
                          $("#next").hide();
                          $("#wait").css("display", "none");
                          console.log(search_result);
                          $("#append_rows").empty();
                          $("#append_rows_search").empty();
                          for(var i=0; i<search_result.data.length;i++)
                          {
                            console.log(search_result.data[i].Contact);
                             $("#append_rows_search").append('<div id="'+search_result.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+search_result.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+search_result.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+search_result.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+search_result.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+search_result.data[i].Email+'_search" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+search_result.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+search_result.data[i].Contact+'_search" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+search_result.data[i].Contact+'></div><div class="col-sm-1 col8"><p>'+search_result.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+search_result.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+search_result.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+search_result.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+search_result.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');                         
                          }
                        },error:function(errdatagc)
            {
                console.log(errdatagc);
            }        
              });  
    }
      }); 
  
  $.ajax
  ({  
      url:'http://139.59.56.245:3080/sync?pretty',
      type:'GET',
					  success:function(datago)
					  {    
                page_number=1;
                $('#view_records').unbind('click');
                $('#view_records').attr('onClick','sync_view()');
                $('#prev').unbind('click');
                $('#prev').attr('onClick','syncprev()');
                $('#next').unbind('click');
                $('#next').attr('onClick','syncnext()');
					      $("#wait").css("display", "none");
					      console.log(datago);
					      if(datago.response == false)
					      {
					        alert("Couldn't fetch contact infor types");
					      }
					      else
					      {
					        console.log(datago.data.length);
					        // firstdisplayed =datago.data[0].serial;
					        for(var i=0; i<datago.data.length;i++){
					           $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        }
					        // for(var i=0; i<5;i++){
					        //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        // }
					      
					      }
					  },error:function(errdatagc)
					  {
					      console.log(errdatagc);
					  }
  });

 $.ajax
  ({  
      url:'http://139.59.56.245:3080/sync_all?pretty',
      type:'GET',
					  success:function(datago)
					  {   
					      $("#wait").css("display", "none");
					      console.log(datago);
					      if(datago.response == false)
					      {
					        alert("Couldn't fetch contact infor types");
					      }
					      else
					      {
					      	total_records=datago.data.length;
					      	console.log("data"+datago.data.length);
					      	var limit=$("#limit").val();
					      	console.log(limit);
					        no_of_pages=Math.ceil(datago.data.length/limit);
					        console.log(no_of_pages);
					      
					      }
					  },error:function(errdatagc)
					  {
					      console.log(errdatagc);
					  }
  });


if(window.location.href.indexOf("view-more.html") >= 0 )
{
  var eid = window.location.href.split('#').pop();
  
$.ajax
  ({  
      url:'http://139.59.56.245:3080/appid/'+eid,
      type:'GET',
      success:function(datago2)
      {
          if(datago2.response == false)
          {
              alert("Couldn't fetch contact infor types");
          }
          else
          { 
            
            console.log(datago2.data.length);
            for(var i=0; i<datago2.data.length;i++)
             {     
                    $("#description_name").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Event_name+'</div>');
                    $("#description_appid").append('<div class="col-sm-10 detail_description">'+datago2.data[i].appid+'</div>');
                    $("#description_event_id").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Event_ID+'</div>');
                    $("#description_category").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Category+'</div>');
                    $("#description_Sub_category").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Sub_category+'</div>');
                    $("#description_Format").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Format+'</div>');
                    $("#description_URL").append('<div class="col-sm-10 detail_description">'+datago2.data[i].URL+'</div>');
                    $("#description_Description").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Description+'</div>');
                    $("#description_description_text").append('<div class="col-sm-10 detail_description">'+datago2.data[i].description_text+'</div>');
                    $("#description_Start_date").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Start_date+'</div>');
                    $("#description_End_date").append('<div class="col-sm-10 detail_description">'+datago2.data[i].End_date+'</div>');
                    $("#description_Created").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Created+'</div>');
                    $("#description_Changed").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Changed+'</div>');
                    $("#description_Capacity").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Capacity+'</div>');
                    $("#description_active").append('<div class="col-sm-10 detail_description">'+datago2.data[i].active+'</div>');
                    $("#description_Status").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Status+'</div>');
                    $("#description_Image_url").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Image_url+'</div>');
                    $("#description_aws_url").append('<div class="col-sm-10 detail_description">'+datago2.data[i].aws_url+'</div>');
                    $("#description_Free").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Free+'</div>');
                    $("#description_Venue").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Venue+'</div>');
                    $("#description_City").append('<div class="col-sm-10 detail_description">'+datago2.data[i].City+'</div>');
                    $("#description_citycopy").append('<div class="col-sm-10 detail_description">'+datago2.data[i].citycopy+'</div>');
                    $("#description_Country").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Country+'</div>');
                    $("#description_Latitude").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Latitude+'</div>');
                    $("#description_Longitude").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Longitude+'</div>');
                    $("#description_Email").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Email+'</div>');
                    $("#description_Contact").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Contact+'</div>');
                    $("#description_Source").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Source+'</div>');
                    $("#description_sync").append('<div class="col-sm-10 detail_description">'+datago2.data[i].sync+'</div>');
                    $("#description_Organiser_name").append('<div class="col-sm-10 detail_description">'+datago2.data[i].Organiser_name+'</div>');
                    $("#description_O_Description").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Description+'</div>');
                    $("#description_O_Website").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Website+'</div>');
                    $("#descriptionO_Facebook_ID").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Facebook_ID+'</div>');
                    $("#description_O_Twitter_handle").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Twitter_handle+'</div>');
                    $("#description_O_URL").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_URL+'</div>');
                    $("#description_O_Image_URL").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Image_URL+'</div>');
                    $("#description_O_Email").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Email+'</div>');
                    $("#description_O_Contact").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Contact+'</div>');
                    $("#description_O_Source").append('<div class="col-sm-10 detail_description">'+datago2.data[i].O_Source+'</div>');
              }
          }
      },error:function(errdatagc)
      {
          console.log(errdatagc);
      }
  });

}

  if(window.location.href.indexOf("edit.html") >= 0 )
{
  
   var eid2 = window.location.href.split('#').pop();
   console.log(eid2);
  
$.ajax
  ({  
      url:'http://139.59.56.245:3080/appid/'+eid2,
      type:'GET',
      success:function(datago3)
      {
          if(datago3.response == false)
          {
              alert("Couldn't fetch contact infor types");
          }
          else
          { 
            for(var i=0; i<datago3.data.length;i++)
             {  
                    var sd=datago3.data[i].Start_date.replace('Z', '').replace('T', ' ');
                    var ed=datago3.data[i].End_date.replace('Z', '').replace('T', ' ');
                    var cr=datago3.data[i].Created.replace('Z', '').replace('T', ' ');
                    var chn=datago3.data[i].Changed.replace('Z', '').replace('T', ' ');
                    $("#description_name").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_name_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Event_name+'</div>');
                    $("#description_appid").append('<div contenteditable="false" class="col-sm-10 detail_description" id="description_appid_edit">'+datago3.data[i].appid+'</div>');
                    $("#description_event_id").append('<div contenteditable="false" class="col-sm-10 detail_description" id="description_event_id_edit">'+datago3.data[i].Event_ID+'</div>');
                    $("#description_category").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_category_edit">'+datago3.data[i].Category+'</div>');
                    $("#description_Sub_category").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Sub_category_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Sub_category+'</div>');
                    $("#description_Format").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Format_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Format+'</div>');
                    $("#description_URL").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_URL_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].URL+'</div>');
                    $("#description_Description").append('<div contenteditable="false"  class="col-sm-10 detail_description" id="description_Description_edit">'+datago3.data[i].Description+'</div>');
                    $("#description_description_text").append('<div contenteditable="true"  class="col-sm-10 detail_description" id="description_description_text_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].description_text+'</div>');
                    $("#description_Start_date").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Start_date_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+sd+'</div>');
                    $("#description_End_date").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_End_date_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+ed+'</div>');
                    $("#description_Created").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Created_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+cr+'</div>');
                    $("#description_Changed").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Changed_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+chn+'</div>');
                    $("#description_Capacity").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Capacity_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Capacity+'</div>');
                    $("#description_active").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_active_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].active+'</div>');
                    $("#description_Status").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Status_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Status+'</div>');
                    $("#description_Image_url").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Image_url_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Image_url+'</div>');
                    $("#description_aws_url").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_aws_url_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].aws_url+'</div>');
                    $("#description_Free").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Free_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Free+'</div>');
                    $("#description_Venue").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Venue_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Venue+'</div>');
                    $("#description_City").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_City_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].City+'</div>');
                    $("#description_citycopy").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_citycopy_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].citycopy+'</div>');
                    $("#description_Country").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Country_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Country+'</div>');
                    $("#description_Latitude").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Latitude_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Latitude+'</div>');
                    $("#description_Longitude").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Longitude_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Longitude+'</div>');
                    $("#description_Email").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Email_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Email+'</div>');
                    $("#description_Contact").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Contact_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Contact+'</div>');
                    $("#description_Source").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Source_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Source+'</div>');
                    $("#description_sync").append('<div contenteditable="false" class="col-sm-10 detail_description" id="description_sync_edit">'+datago3.data[i].sync+'</div>');
                    $("#description_Organiser_name").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_Organiser_name_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].Organiser_name+'</div>');
                    $("#description_O_Description").append('<div contenteditable="false" class="col-sm-10 detail_description" id="description_O_Description_edit">'+datago3.data[i].O_Description+'</div>');
                    $("#description_O_Website").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_O_Website_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Website+'</div>');
                    $("#descriptionO_Facebook_ID").append('<div contenteditable="true" class="col-sm-10 detail_description" id="descriptionO_Facebook_ID_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Facebook_ID+'</div>');
                    $("#description_O_Twitter_handle").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_O_Twitter_handle_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Twitter_handle+'</div>');
                    $("#description_O_URL").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_O_URL_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_URL+'</div>');
                    $("#description_O_Image_URL").append('<div contenteditable="true"  class="col-sm-10 detail_description" id="description_O_Image_URL_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Image_URL+'</div>');
                    $("#description_O_Email").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_O_Email_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Email+'</div>');
                    $("#description_O_Contact").append('<div contenteditable="true" class="col-sm-10 detail_description" id="description_O_Contact_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Contact+'</div>');
                    $("#description_O_Source").append('<div contenteditable="true"  class="col-sm-10 detail_description" id="description_O_Source_edit"><font color="#84472d"><i class="fas fa-edit"></i></font>'+datago3.data[i].O_Source+'</div>');
                    
               }
            }
      },error:function(errdatagc)
      {
          console.log(errdatagc);
      }
  });
}


 if(window.location.href.indexOf("add.html") >= 0 )
{
       
        $("#description_name").append('<div class="col-sm-10" ><input class="add-events" id="description_name_add" type="text"></input></div>');
        $("#description_category").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_category_add" type="text"></input></div>');
        $("#description_Sub_category").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Sub_category_add" type="text"></input></div>');
        $("#description_Format").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Format_add" type="text"></input></div>');
        $("#description_URL").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_URL_add" type="text"></input></div>');
        $("#description_Description").append('<div class="col-sm-10 detail_description"><textarea  id="description_Description_add" class="desc-text"></textarea></input></div>');
        $("#description_description_text").append('<div class="col-sm-10 detail_description" ><textarea id="description_description_text_add" class="desc-text"></textarea></div>');
        $("#description_Start_date").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Start_date_add" type="text"></input></div>');
        $("#description_End_date").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_End_date_add" type="text"></input></div>');
        $("#description_Capacity").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Capacity_add" type="text"></input></div>');
        $("#description_Image_url").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Image_url_add" type="text"></input></div>');
        $("#description_Free").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Free_add" type="text"></input></div>');
        $("#description_Venue").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_Venue_add" type="text"></input></div>');
        $("#description_City").append('<div class="col-sm-10 detail_description" ><input class="add-events" id="description_City_add" type="text"></input></div>');
        $("#description_Country").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_Country_add" type="text"></input></div>');
        $("#description_Latitude").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_Latitude_add" type="text"></input></div>');
        $("#description_Longitude").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_Longitude_add" type="text"></input></div>');
        $("#description_Email").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_Email_add" type="text"></input></div>');
        $("#description_Contact").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_Contact_add" type="text"></input></div>');
        $("#description_Organiser_name").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_Organiser_name_add" type="text"></input></div>');
        $("#description_O_Description").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_O_Description_add" type="text"></input></div>');
        $("#description_O_Website").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_O_Website_add" type="text"></input></div>');
        $("#descriptionO_Facebook_ID").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="descriptionO_Facebook_ID_add" type="text"></input></div>');
        $("#description_O_Twitter_handle").append(' <div class="col-sm-10 detail_description"><input class="add-events" id="description_O_Twitter_handle_add" type="text"></input></div>');
        $("#description_O_URL").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_O_URL_add" type="text"></input></div>');
        $("#description_O_Image_URL").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_O_Image_URL_add" type="text"></input></div>');
        $("#description_O_Email").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_O_Email_add" type="text"></input></div>');
        $("#description_O_Contact").append(' <div class="col-sm-10 detail_description" ><input class="add-events" id="description_O_Contact_add" type="text"></input></div>');
   
}

});

function save_all()
{
   $.ajax
  ({  
      url:'http://139.59.56.245:3080/sync_all?pretty',
      type:'GET',
					  success:function(datago_sync)
					  {  
					    $("#wait").css("display", "none"); 
					  	console.log(datago_sync.data.length);
					    if(datago_sync.response == false)
					    {
					        alert("Couldn't fetch contact infor types");
					    }
					      else
					      {
					         var sv=confirm("Are you sure you want to save all the records?");
					         if(sv==1)
					         {

					       	//api to save all
					         	for(var i=0;i<datago_sync.data.length;i++)
                               {
							     
							     var appid=datago_sync.data[i].appid;
							     console.log(appid);
							     // $.ajax({
								    //         type: 'POST',
								    //         data:{"app_id":appid},
								    //         url: 'http://139.59.56.245:3080/save',
            //            					    success: function(save) {
            //                                 $("#wait").css("display", "none");
            //                                 console.log('success');
            //                                 Redirect();
            
            //                                 }    
            //                      });
                                }
					         }
					     
					      }
					  },error:function(errdatagc)
					  {
					      console.log(errdatagc);
					  }
  });
 
}


function sync_view()
{
	var limit=$("#limit").val();
	// console.log('limit'+limit);
	if(limit=='')
		Redirect();
	no_of_pages=Math.ceil(total_records/limit);
	// console.log(no_of_pages);
	
    $.ajax({  
      url:'http://139.59.56.245:3080/sync_view/'+limit+'?pretty',
      type:'GET',
					  success:function(sync_view)
					  {   
					  	  $("#append_rows").empty();
                          $("#append_rows_search").empty();
					      $("#wait").css("display", "none");
					      console.log(sync_view);
					      // console.log('hi'+sync_view.data.length);
					      if(sync_view.response == false)
					      {
					        alert("Couldn't fetch contact infor types");
					      }
					      else
					      {
					        console.log(sync_view.data.length);
					        // firstdisplayed =datago.data[0].serial;
					        for(var i=0; i<sync_view.data.length;i++){
					           $("#append_rows").append('<div id="'+sync_view.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+sync_view.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+sync_view.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+sync_view.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+sync_view.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+sync_view.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+sync_view.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+sync_view.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+sync_view.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+sync_view.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+sync_view.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+sync_view.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+sync_view.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+sync_view.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        }
					        // for(var i=0; i<5;i++){
					        //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        // }
					      
					      }
					  },error:function(errdatagc)
					  {
					      console.log(errdatagc);
					  }
  });
}
function sort_view()
{
  // alert("S View");
  var limit=$("#limit").val();
  // console.log('limit'+limit);
  if(limit=='')
    Redirect();
  no_of_pages=Math.ceil(total_records/limit);
  // console.log(no_of_pages);
  
    $.ajax({  
      url:'http://139.59.56.245:3080/sort_view/'+limit+'?pretty',
      type:'GET',
            success:function(sort_view)
            {   
                $("#append_rows").empty();
                $("#append_rows_search").empty();
                $("#wait").css("display", "none");
                console.log(sort_view);
                // console.log('hi'+sync_view.data.length);
                if(sort_view.response == false)
                {
                  alert("Couldn't fetch contact infor types");
                }
                else
                {
                  console.log(sort_view.data.length);
                  // firstdisplayed =datago.data[0].serial;
                  for(var i=0; i<sort_view.data.length;i++){
                     $("#append_rows").append('<div id="'+sort_view.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+sort_view.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+sort_view.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+sort_view.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+sort_view.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+sort_view.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+sort_view.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+sort_view.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+sort_view.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+sort_view.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+sort_view.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+sort_view.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+sort_view.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+sort_view.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
                  }
                  // for(var i=0; i<5;i++){
                  //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
                  // }
                
                }
            },error:function(errdatagc)
            {
                console.log(errdatagc);
            }
  });
}

function syncnext()
{
    if(page_number==(no_of_pages))
	{
		$('.next').attr('disabled', true);
	    // $('.prev').css({'background-color':"red"});
	}
	else
  {		
	// console.log("pages");
  // console.log(no_of_pages);
	++page_number;
	console.log(page_number);
	var limit=$("#limit").val();
	// console.log('limitnext:'+limit);
	no_of_pages=Math.ceil(total_records/limit);
	if(limit=='')
		Redirect();
	//console.log("syncmore");
	  
    $.ajax
    ({  
      url:'http://139.59.56.245:3080/syncnext/'+limit+'/'+page_number+'?pretty',
      type:'GET',
					  success:function(syncnext)
					  {   
					      $("#wait").css("display", "none");
					      $("#append_rows").empty();
                          $("#append_rows_search").empty();

					      console.log(syncnext);
					      if(syncnext.response == false)
					      {
					        // alert("Couldn't fetch contact infor types");
					      }
					      else
					      {
					        console.log(syncnext.data.length);
					        // for(var i=0; i<datago.data.length;i++){
					        //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        // }
					        for(var i=0; i<syncnext.data.length;i++){
					           $("#append_rows").append('<div id="'+syncnext.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+syncnext.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+syncnext.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+syncnext.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+syncnext.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+syncnext.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+syncnext.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+syncnext.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+syncnext.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+syncnext.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+syncnext.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+syncnext.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+syncnext.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+syncnext.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        }
					      
					      }
					  },error:function(errdatagc)
					  {
					      console.log(errdatagc);
					  }
    });
 }
}

function syncprev()
{
	if(page_number==1)
	{
		$('.prev').attr('disabled', true);
	    // $('.prev').css({'background-color':"red"});
	}
	else
	{
	   // $('.prev').css({'background-color':"#ccc"});
	--page_number;
	console.log(page_number);
	var limit=$("#limit").val();
	console.log(limit);
	if(limit=='')
		Redirect();
	//console.log("syncmore");
	  
    $.ajax({  
      url:'http://139.59.56.245:3080/syncprev/'+limit+'/'+page_number+'?pretty',
      type:'GET',
					  success:function(syncprev)
					  {   
					      $("#wait").css("display", "none");
					      $("#append_rows").empty();
                          $("#append_rows_search").empty();

					      console.log(syncprev);
					      if(syncprev.response == false)
					      {
					        // alert("Couldn't fetch contact infor types");
					      }
					      else
					      {
					        console.log(syncprev.data.length);
					        // for(var i=0; i<datago.data.length;i++){
					        //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        // }
					        for(var i=0; i<syncprev.data.length;i++){
					           $("#append_rows").append('<div id="'+syncprev.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+syncprev.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+syncprev.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+syncprev.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+syncprev.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+syncprev.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+syncprev.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+syncprev.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+syncprev.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+syncprev.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+syncprev.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+syncprev.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+syncprev.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+syncprev.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
					        }
					      
					      }
					  },error:function(errdatagc)
					  {
					      console.log(errdatagc);
					  }
    });
   }
}
function sortnext()
{
    if(page_number==(no_of_pages))
  {
    $('.next').attr('disabled', true);
      // $('.prev').css({'background-color':"red"});
  }
  else
  {   
  // console.log("pages");
  // console.log(no_of_pages);
  ++page_number;
  console.log(page_number);
  var limit=$("#limit").val();
  // console.log('limitnext:'+limit);
  no_of_pages=Math.ceil(total_records/limit);
  if(limit=='')
    Redirect();
  //console.log("syncmore");
    
    $.ajax
    ({  
      url:'http://139.59.56.245:3080/sortnext/'+limit+'/'+page_number+'?pretty',
      type:'GET',
            success:function(syncnext)
            {   
                $("#wait").css("display", "none");
                $("#append_rows").empty();
                          $("#append_rows_search").empty();

                console.log(syncnext);
                if(syncnext.response == false)
                {
                  // alert("Couldn't fetch contact infor types");
                }
                else
                {
                  console.log(syncnext.data.length);
                  // for(var i=0; i<datago.data.length;i++){
                  //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
                  // }
                  for(var i=0; i<syncnext.data.length;i++){
                     $("#append_rows").append('<div id="'+syncnext.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+syncnext.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+syncnext.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+syncnext.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+syncnext.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+syncnext.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+syncnext.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+syncnext.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+syncnext.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+syncnext.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+syncnext.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+syncnext.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+syncnext.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+syncnext.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
                  }
                
                }
            },error:function(errdatagc)
            {
                console.log(errdatagc);
            }
    });
 }
}
  
function sortprev()
{
  if(page_number==1)
  {
    $('.prev').attr('disabled', true);
      // $('.prev').css({'background-color':"red"});
  }
  else
  {
     // $('.prev').css({'background-color':"#ccc"});
  --page_number;
  console.log(page_number);
  var limit=$("#limit").val();
  console.log(limit);
  if(limit=='')
    Redirect();
  //console.log("syncmore");
    
    $.ajax({  
      url:'http://139.59.56.245:3080/sortprev/'+limit+'/'+page_number+'?pretty',
      type:'GET',
            success:function(syncprev)
            {   
                $("#wait").css("display", "none");
                $("#append_rows").empty();
                          $("#append_rows_search").empty();

                console.log(syncprev);
                if(syncprev.response == false)
                {
                  // alert("Couldn't fetch contact infor types");
                }
                else
                {
                  console.log(syncprev.data.length);
                  // for(var i=0; i<datago.data.length;i++){
                  //    $("#append_rows").append('<div id="'+datago.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+datago.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+datago.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+datago.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+datago.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+datago.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+datago.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+datago.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+datago.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+datago.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+datago.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+datago.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+datago.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+datago.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
                  // }
                  for(var i=0; i<syncprev.data.length;i++){
                     $("#append_rows").append('<div id="'+syncprev.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+syncprev.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+syncprev.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+syncprev.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+syncprev.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+syncprev.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+syncprev.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+syncprev.data[i].contact+'_contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+syncprev.data[i].contact+'></div><div class="col-sm-1 col8"><p>'+syncprev.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+syncprev.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+syncprev.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+syncprev.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+syncprev.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');           
                  }
                
                }
            },error:function(errdatagc)
            {
                console.log(errdatagc);
            }
    });
   }
}

function email_on_change(item)
{

  var app_id=$(item).parent().parent()[0].id;
  var email_change=$(item).val();
  console.log(email_change);
  $.ajax({
            type: 'POST',
            data:{"app_id":app_id,"email_change":email_change},
            
            url: 'http://139.59.56.245:3080/edit_email',
                        success: function(email) {
                            console.log('success');
                            // console.log(exc);
                            if(email.response==true)
                             {
                               //Redirect();
                               alert("Edit successful!");
                               Redirect();
                             }
                            else
                             {
                               alert(" Edit failed");
                             }
                           
                        }
        });

 
}

function edit_email_min(item)
{
  var mailid=$(item)[0].id;
  $("#".mailid).css({'width': '100%','text-overflow': 'initial','overflow': 'auto','white-space': 'normal'}); 
}

function contact_on_change(item)
{
  var app_id=$(item).parent().parent()[0].id;
  var cont_change=$(item).val();
  console.log(cont_change);
   $.ajax({
            type: 'POST',
            data:{"app_id":app_id,"contact_change":cont_change},
            
            url: 'http://139.59.56.245:3080/edit_contact',
                        success: function(contact) {
                            console.log('success');
                            // console.log(contact);
                            if(contact.response==true)
                             {
                               //Redirect();
                               alert("Edit successful!");
                               Redirect();
                             }
                            else
                             {
                               alert(" Edit failed");
                             }
                           
                        }
        });

}

function edit_cont_min(item)
{
   var cont=$(item)[0].id;
   $("#"+cont).css({'width': '100%','text-overflow': 'initial','overflow': 'auto','white-space': 'normal'});
}


function Redirect()
{
  window.location="adminpanel.html";
}  


function confirm_edit_save()
{
 var r = confirm("Are you sure you want to save the changes?");
    if (r == true)
     {
       edit_save();
     }  
}


function edit_save()
{
  var des_name_edit = $("#description_name_edit").text();
  var des_app_edit = $("#description_appid_edit").text();
  var des_cat_edit = $("#description_category_edit").text();
  var des_subcat_edit = $("#description_Sub_category_edit").text();
  var des_format_edit = $("#description_Format_edit").text();
  var des_url_edit = $("#description_URL_edit").text();
  var des_descrip_text_edit = $("#description_description_text_edit").text();
  var des_sdate_edit = $("#description_Start_date_edit").text();
  var des_edate_edit = $("#description_End_date_edit").text();
  var des_cap_edit = $("#description_Capacity_edit").text();
  var des_img_url_edit = $("#description_Image_url_edit").text();
  var des_free_edit = $("#description_Free_edit").text();
  var des_venue_edit = $("#description_Venue_edit").text();
  var des_city_edit = $("#description_City_edit").text();
  var des_country_edit = $("#description_Country_edit").text();
  var des_lat_edit = $("#description_Latitude_edit").text();
  var des_long_edit = $("#description_Longitude_edit").text();
  var des_email_edit = $("#description_Email_edit").text();
  var des_contact_edit = $("#description_Contact_edit").text();
  var des_oname_edit = $("#description_Organiser_name_edit").text();
  var des_odesc_edit = $("#description_O_Description_edit").text();
  var des_oweb_edit = $("#description_O_Website_edit").text();
  var des_ofb_edit = $("#descriptionO_Facebook_ID_edit").text();
  var des_otwitter_edit = $("#description_O_Twitter_handle_edit").text();
  var des_ourl_edit = $("#description_O_URL_edit").text();
  var des_oimgurl_edit = $("#description_O_Image_URL_edit").text();
  var des_oemail_edit = $("#description_O_Email_edit").text();
  var des_ocontact_edit = $("#description_O_Contact_edit").text();
  var des_created_edit = $("#description_Created_edit").text();
  var des_changed_edit = $("#description_Changed_edit").text();
  var des_active_edit = $("#description_active_edit").text();
  var des_status_edit = $("#description_Status_edit").text();
  var des_aws_url_edit = $("#description_aws_url_edit").text();
  var des_source_edit = $("#description_Source_edit").text();
  var des_osource_edit = $("#description_O_Source_edit").text();

 $.ajax({
            type: 'POST',
            data:{"appid":des_app_edit,"Event_name":des_name_edit,"Category":des_cat_edit,"Sub_category":des_subcat_edit,"Format":des_format_edit,
            "URL":des_url_edit,"Description_text":des_descrip_text_edit,"Start_date":des_sdate_edit,"End_date":des_edate_edit,"Capacity":des_cap_edit,
            "Image_url":des_img_url_edit,"Free":des_free_edit,"Venue":des_venue_edit,"City":des_city_edit,"Country":des_country_edit,
            "Latitude":des_lat_edit,"Longitude":des_long_edit,"Email":des_email_edit,"Contact":des_contact_edit,"Organiser_name":des_oname_edit,
            "O_Website":des_oweb_edit,"O_Facebook_ID":des_ofb_edit,
            "O_Twitter_handle":des_otwitter_edit,"O_URL":des_ourl_edit,"O_Image_URL":des_oimgurl_edit,"O_Email":des_oemail_edit,"O_Contact":des_ocontact_edit,"created":des_created_edit,"changed":des_changed_edit,"active":des_active_edit,"status":des_status_edit,"aws-url":des_aws_url_edit,"source":des_source_edit,"o_source":des_osource_edit},
            
            url: 'http://139.59.56.245:3080/edit',
                        success: function(edit) {
                            console.log('success');
                            console.log(JSON.stringify(edit));
                            if(edit.response==true)
                            {
                              Redirect();
                              alert("Edit successful!");
                            }
                            else
                            {
                              alert("Edit failed");
                            }
                        }
        });
}

window.addEventListener("load", function() {
    document.getElementById("file-upload").onchange = function(e) {
        var files = e.target.files; // From the Upload type html object, get the file path that is uploaded
	    var f = files[0];
	  {

	    var reader = new FileReader();
	    var name = f.name;
	    reader.onload = function(e)
	    {
	      var data = e.target.result;
	      var wb;
	      if(rABS)
	      {
	        wb = XLSX.read(data, {type: 'binary'});
	      }
	      to_json(wb); // send the parsed file for converting it to JSON
	    };
	    if(rABS) reader.readAsBinaryString(f);
	    else reader.readAsArrayBuffer(f);
	  }
	}});

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if(roa.length > 0)
    {
      result[sheetName] = roa;
      jsonObj = roa;
      // jsonObj is the converted excel file that is now in the JSON form
    }

  });
  $('#upload').click(function(event)
    {
          upload_excel(jsonObj);
     });
}

function upload_excel(jsonObj)
{
$.ajax({
            type: 'POST',
            data:{"json":jsonObj,"length":jsonObj.length},
            
            url: 'http://139.59.56.245:3080/excel',
                        success: function(exc) {
                            console.log('success');
                            console.log(exc);
                            if(exc.response==true)
                             {
                               alert("Upload successful!");
                             }
                            else
                             {
                               alert("Upload failed");
                             }
                           
                        }
        });
console.log(jsonObj);
}

function cancel_upload()
{
   window.location="excel_json.html";
}

 
 function confirm_save_index(item)
{
    var r = confirm("Are you sure you want to save the selected events?");
    if (r == true)
    {
       save_selected(item);
    }  
} 


function save_selected(item)
{
  console.log("Save");
  var save_selected=$("input:checkbox[name=ck]:checked");
  for(var i=0;i<save_selected.length;i++)
   {
     var ele=save_selected[i];
     var parent_appid=$(ele).parent().parent().parent()[0].id;
     console.log(parent_appid);
     $.ajax({
            type: 'POST',
            data:{"app_id":parent_appid},
            url: 'http://139.59.56.245:3080/save',
                        success: function(save) {
                           $("#wait").css("display", "none");
                            console.log('success');
                            Redirect();
            
                        }
     });
   }

  

}

function confirm_save()
{
    var r = confirm("Are you sure you want to save this event?");
    if (r == true)
     {
       add_save();
     }  
}

function add_save()
{
  var des_name = $("#description_name_add").val();
  var des_cat = $("#description_category_add").val();
  var des_subcat = $("#description_Sub_category_add").val();
  var des_format = $("#description_Format_add").val();
  var des_url = $("#description_URL_add").val();
  var des_descrip = $("#description_Description_add").val();
  var des_descrip_text = $("#description_description_text_add").val();
  var des_sdate = $("#description_Start_date_add").val();
  var des_edate = $("#description_End_date_add").val();
  var des_cap = $("#description_Capacity_add").val();
  var des_img_url = $("#description_Image_url_add").val();
  var des_free = $("#description_Free_add").val();
  var des_venue = $("#description_Venue_add").val();
  var des_city = $("#description_City_add").val();
  var des_country = $("#description_Country_add").val();
  var des_lat = $("#description_Latitude_add").val();
  var des_long = $("#description_Longitude_add").val();
  var des_email = $("#description_Email_add").val();
  var des_contact = $("#description_Contact_add").val();
  var des_oname = $("#description_Organiser_name_add").val();
  var des_odesc = $("#description_O_Description_add").val();
  var des_oweb = $("#description_O_Website_add").val();
  var des_ofb = $("#descriptionO_Facebook_ID_add").val();
  var des_otwitter = $("#description_O_Twitter_handle_add").val();
  var des_ourl = $("#description_O_URL_add").val();
  var des_oimgurl = $("#description_O_Image_URL_add").val();
  var des_oemail = $("#description_O_Email_add").val();
  var des_ocontact = $("#description_O_Contact_add").val();

 $.ajax({
            type: 'POST',
            data:{"Event_name":des_name,"Category":des_cat,"Sub_category":des_subcat,"Format":des_format,
            "URL":des_url,"Description":des_descrip,"Description_text":des_descrip_text,"Start_date":des_sdate,"End_date":des_edate,"Capacity":des_cap,
            "Image_url":des_img_url,"Free":des_free,"Venue":des_venue,"City":des_city,"Country":des_country,
            "Latitude":des_lat,"Longitude":des_long,"Email":des_email,"Contact":des_contact,"Organiser_name":des_oname,
            "O_Description":des_odesc,"O_Website":des_oweb,"O_Facebook_ID":des_ofb,
            "O_Twitter_handle":des_otwitter,"O_URL":des_ourl,"O_Image_URL":des_oimgurl,"O_Email":des_oemail,"O_Contact":des_ocontact},
            
            url: 'http://139.59.56.245:3080/add',
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                            Redirect();
                        }
        });
}

//To select all checkboxes
function toggle(source) {
  checkboxes = document.getElementsByName('ck');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}



function confirm_delete(item)
 {
    var r = confirm("Are you sure you want to delete this event?");
    if (r == true)
     {
       deleteElement(item);
     }  
 }


 //To delete individual row
 function deleteElement(item)
 {

   var rows = $(item).parent().parent().parent()[0].id;
   $("#"+rows).hide();
   $.ajax({
            type: 'DELETE',
            data:{"id":rows},
            url: 'http://139.59.56.245:3080/delete',
                        success: function(data) {
                            $("#wait").css("display", "none");
                            console.log('success');
                            console.log(JSON.stringify(data));
                            Redirect();
                        }
    });
 }

  
function confirm_delete_multiple(item)
 {
    var r = confirm("Are you sure you want to delete selected events?");
    if (r == true) 
    { 
    	deleteSelectedElements(item);
    }     
 }

 function deleteSelectedElements(item)
 {
  var selected=$("input:checkbox[name=ck]:checked");
  for(var i=0;i<selected.length;i++)
   {
     var cur_ele=selected[i];
     var cur_parent_id=$(cur_ele).parent().parent().parent()[0].id;
     $("#"+cur_parent_id).hide();
     $.ajax({
            type: 'DELETE',
            data:{"id":cur_parent_id},
            url: 'http://139.59.56.245:3080/delete',
                        success: function(data) {
                             $("#wait").css("display", "none");
                            console.log('success');
                            console.log(JSON.stringify(data));
                            Redirect();
                        }
     });
    }
 }

 function deleteSelectedElements_leads(item)
 {
  var selected=$("input:checkbox[name=ck]:checked");
  for(var i=0;i<selected.length;i++)
   {
     var cur_ele=selected[i];
     var cur_parent_id=$(cur_ele).parent().parent().parent()[0].id;
     $("#"+cur_parent_id).hide();
      
    }
 }

function dropdownFunction()
{
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) 
{
  if (!event.target.matches('.dropbtn'))
  {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show'))
        {
           openDropdown.classList.remove('show');
        }
    }
  }
}

function dropdownFunction2(item)
{
  var id_row = $(item).siblings()[0].id;
  $("#"+ id_row).css("display","block");
}

function hidedropdown(item)
{
    var class_drop = $(item).siblings()[0].id;
    $("#"+ class_drop).hide();
}

function sort_by_start_date()
{
  //view_records
  page_number=1;
	$.ajax({
            type: 'GET',
            url: 'http://139.59.56.245:3080/sort?pretty',
                        success: function(sort) {
                          $("#wait").css("display", "none");
                          $("#append_rows").empty();
                          $("#append_rows_search").empty();
                          for(var i=0; i<sort.data.length;i++)
                          {
                             $("#append_rows_search").append('<div id="'+sort.data[i].appid+'" class="form2 row f"><div class="col-sm-1 col1"> <label ><input name="ck" type="checkbox" value=""></label></div><div class="col-sm-2 col2"><p>'+sort.data[i].Event_name+'</p></div><div class="col-sm-1 col3"><p>'+sort.data[i].Format+'</p></div><div class="col-sm-1 col4"><p>'+sort.data[i].City+'</p></div><div class="col-sm-1 col5"><p>'+sort.data[i].Country+'</p></div><div class="col-sm-1 col6" contenteditable="true"><input class="email_edit" id="'+sort.data[i].Email+'_email" onclick="edit_email_min(this)" onchange="email_on_change(this)" value='+sort.data[i].Email+'></div><div class="col-sm-1 col7" contenteditable="true"><input class="contact_edit" id="'+sort.data[i].Contact+'#contact" onclick="edit_cont_min(this)" onchange="contact_on_change(this)" value='+sort.data[i].Contact+'></div><div class="col-sm-1 col8"><p>'+sort.data[i].Organiser_name+'</p></div><div class="col-sm-1 col9"><p>'+sort.data[i].Start_date+'</p></div><div class="col-sm-1 col10"><p>'+sort.data[i].End_date+'</p></div><div class="col-sm-1 col11 dropdown2"> <button type="button" class="btn more" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i> </button><div class="dropdown-menu"> <a class="dropdown-item" href="leadscreen.html">Leads</a> <a class="dropdown-item" href="edit.html#'+sort.data[i].appid+'">Edit</a> <a class="dropdown-item" href="view-more.html#'+sort.data[i].appid+'">View More</a> <a class="dropdown-item" onclick="confirm_delete(this)">Delete</a></div></div></div>');                          }
                          }        
    });  
  $('#view_records').unbind('click');
  $('#view_records').attr('onClick','sort_view()');
  $('#prev').unbind('click');
  $('#prev').attr('onClick','sortprev()');
  $('#next').unbind('click');
  $('#next').attr('onClick','sortnext()');
}

 function employee_login()

{
 	
 	var username=$('#username').val();
 	var password=$('#password').val();
 	console.log(username);
 	console.log(password);

 	$.ajax({
            type: 'POST',
            data:{"username":username,"password":password},
            url: 'http://139.59.56.245:3080/login?pretty',
                        success: function(datalogin) {
                        
                        	// console.log(datalogin);
                        	if(datalogin.response==true)
                        	{
                        		Redirect();
                        	}
                        	else
                        		alert("Incorrect username or password!");
                        }               
    });
 }
