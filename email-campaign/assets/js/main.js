function opentab(evt, cityName) {

    if (cityName == "campaigns") {
        // $('#defaultOpen').css("border-bottom", "red");
        $('#defaultOpen').addClass('border_bottom');
        // alert("campaigns");
    }
    if (cityName == "audience") {

        // alert("audience");
    }
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


function toggle(source_aud) {
    checkboxes_toggle = document.getElementsByName('audience_ckbox');
    for (var i = 0, n = checkboxes_toggle.length; i < n; i++) {
        checkboxes_toggle[i].checked = source_aud.checked;
    }
}

function toggle_group(source) {
    checkboxes = document.getElementsByName('groups');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
// $("#groups").hasClass("active")(function(){
//         // alert();
//            $("#add_btn").hide();
//     });

$(document).ready(function() {

    $('#groups_tab').click(function() {
        $('#add_btn').hide();
        $('#delete_btn').text('Delete Group');
    });


    if (($('#active_campaigns').hasClass("active")) == true) {

        $('#active_campaigns').css("border-bottom", "3px solid #FF9900 !important");
        // $('#active_campaigns').css("background-color", "yellow");
    }
    // alert();

    //   if(($("#groups").hasClass("active"))==true)
    //          $("#add_btn").hide();
    //   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    // var target = $(e.target).attr("href") // activated tab
    // alert(target);
});
// });
function open_draft() {
    $('#campaigns').hide();
    $('#campaign_draft').show();

}

function button_modal() {
    // alert();
    $("#add_comp_Modal").hide();
    $(".modal-backdrop").hide();
    // $("#myModal").show();
    $('#myModal').modal('show');
    // window.location.reload();
}

function show_campaign_settings() {
    $('#campaign_draft').hide();
    $('#campaign_settings').show();
}

function show_campaign_schedule() {
    $('#campaign_settings').hide();
    $('#campaign_schedule').show();
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