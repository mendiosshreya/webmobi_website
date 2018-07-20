function opentab(evt, cityName) {
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


function toggle(source) {
  checkboxes = document.getElementsByName('ck');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}
function toggle_group(source) {
  checkboxes = document.getElementsByName('groups');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}
// $("#groups").hasClass("active")(function(){
//         // alert();
//            $("#add_btn").hide();
//     });
    
$(document).ready(function()
{
  $('#aaa').click(function(){
  $("#add_comp_Modal").hide();
  $(".modal-backdrop").hide();
  $('#myModal').modal('show');
   });

  //   if(($("#groups").hasClass("active"))==true)
  //          $("#add_btn").hide();
  //   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  // var target = $(e.target).attr("href") // activated tab
  // alert(target);
});
// });
    

function button_modal()
{
    // alert();
    $("#add_comp_Modal").hide();
    $(".modal-backdrop").hide();
    // $("#myModal").show();
    $('#myModal').modal('show');
    // window.location.reload();
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();
// function dropdownFunction()
// {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// window.onclick = function(event) 
// {
//   if (!event.target.matches('.more'))
//   {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++)
//     {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show'))
//         {
//            openDropdown.classList.remove('show');
//         }
//     }
//   }
// }

// function dropdownFunction2(item)
// {
//   var id_row = $(item).siblings()[0].id;
//   $("#"+ id_row).css("display","block");
// }

// function hidedropdown(item)
// {
//     var class_drop = $(item).siblings()[0].id;
//     $("#"+ class_drop).hide();
// }
