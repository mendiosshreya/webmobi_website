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
