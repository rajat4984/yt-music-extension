$(document).ready(function () {
  $(document).delegate(
    ".ytmusic-menu-navigation-item-renderer",
    "click",
    function () {
      // Check if the clicked element is the "Edit playlist" button
      if ($(this).text().trim() === "Edit playlist") {
        setTimeout(() => {
          let playListId = $(this).attr("href").split("/")[1];
          console.log(playListId, "playlistid");
          if ($(".privacy-dropdown").next(".add_cover_btn").length === 0) {
            let inputFile = $("<input>", {
              type: "file",
              accept: "image/*",
              class: "add_cover_btn",
            });

            inputFile.insertAfter(".privacy-dropdown");

            inputFile.on("change", function (event) {
              let file = event.target.files[0];
              if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                  let imageData = e.target.result;

                  // Open IndexedDB
                  let request = indexedDB.open("ytMusicDB", 1);

                  request.onupgradeneeded = function (event) {
                    let db = event.target.result;
                    if (!db.objectStoreNames.contains("images")) {
                      db.createObjectStore("images", {
                        keyPath: "id",
                      });
                    }
                  };

                  request.onsuccess = function (event) {
                    let db = event.target.result;
                    let transaction = db.transaction("images", "readwrite");
                    let store = transaction.objectStore("images");

                    let imageRecord = {
                      id: playListId,
                      data: imageData,
                      name: file.name,
                      timestamp: new Date().toISOString(),
                    };

                    let addRequest = store.add(imageRecord);

                    addRequest.onsuccess = function () {
                      console.log("Image added to IndexedDB:", imageRecord);
                    };

                    addRequest.onerror = function () {
                      console.error("Failed to add image to IndexedDB");
                    };
                  };

                  request.onerror = function (event) {
                    console.error("Error opening IndexedDB", event);
                  };
                };

                reader.readAsDataURL(file);
              }
            });
          }
        }, 500);
      }
    }
  );
});


 
