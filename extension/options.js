function save_options() {
  localStorage.urler = document.getElementById('url').value;
//  chrome.storage.sync.set({
//  urler: URL
//});
}

document.getElementById('save').addEventListener('click',
    save_options);
