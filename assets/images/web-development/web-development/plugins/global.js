// export  function openKommunicatePlugin(context) {
//   (function(d, m) {
//     // const store = context.store.app.context.store.state.hex_server_user_info;
//     // var email = store.value.email;
//     // var userId = store.value.uid;
//     // var username = store.value.username;
     //console.log(email, userId);
// const email="adsda@gmail.com"
// const userId="1224141"

//     var kommunicateSettings;

//     if (email && userId) {
//       kommunicateSettings = {
//         "appId": "f473fcaff998ffbe60f08e0484180fcf",
//         "popupWidget": false,
//         "automaticChatOpenOnNavigation": false,
//         "email": email,
//         "userId": userId,
//       };
//     } else {
//       kommunicateSettings = {
//         "appId": "f473fcaff998ffbe60f08e0484180fcf",
//         "popupWidget": true,
//         preLeadCollection: [
//           {
//             field: "Name",
//             required: true,
//             placeholder: "Enter your name",
//           },
//           {
//             field: "Email",
//             type: "email",
//             required: true,
//             placeholder: "Enter your email",
//           },
//         ],
//       };
//     }

//     var s = document.createElement("script");
//     s.type = "text/javascript";
//     s.async = true;
//     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//     var h = document.getElementsByTagName("head")[0];
//     h.appendChild(s);

//     var openChatWidget = function() {
//       window.kommunicate = window.kommunicate || {};
//       window.kommunicate._globals = kommunicateSettings;
//     };
  
//     var customButton = this.$refs.customButton; // Access the custom button using $refs
//     customButton.addEventListener("click", openChatWidget);
//   })
// }
