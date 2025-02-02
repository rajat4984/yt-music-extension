$(document).ready(function () {
  $(document).delegate(
    ".ytmusic-menu-navigation-item-renderer",
    "click",
    function () {
      if ($(this).text().trim() === "Edit playlist") {
        setTimeout(() => {
          // Check if input already exists
          if ($(".privacy-dropdown").next(".add_cover_btn").length === 0) {
            let inputFile = $("<input>", {
              type: "file",
              accept: "image/*",
              class: "add_cover_btn",
            });

            inputFile.insertAfter(".privacy-dropdown");
            console.log("Input added");
          } else {
            console.log("Input already exists");
          }
        }, 500);
      }
    }
  );
});
