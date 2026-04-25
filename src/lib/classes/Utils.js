let Utils = class {
    RGBtoHEX(rgbStr) {
        const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    fromClassToID(className) {
        return className.replace(/([A-Z])/g, ' $1').trim().replaceAll(' ', '-').toLowerCase()
    }

    codeToString(code) {
        return code.toString().slice(0, -1)
    }

    generateUUID() {
        return 'xxxxx-xxxxx-xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0
            const v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    maskPassword(password) {
        return password.replace(/./g, '*')
    }

    maskEmail(email) {
        return email.replace(/(^.)(.*)(.@.*$)/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 5)) + c)
    }

    downloadRewrite(filename, newText) {
        const element = document.createElement('a');
        const blob = new Blob([newText], { type: 'text/plain' });
  
        element.href = URL.createObjectURL(blob);
        element.download = filename;
  
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }


    async rewriteFile(fileName, newContent) {
        try {
    // 1. Prompt user to select the base directory
    const directoryHandle = await window.showDirectoryPicker();

    // 2. Access the specific file within that directory
    // 'create: true' ensures it exists; omit if you only want to rewrite existing files
    const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });

    // 3. Create a writable stream to rewrite the file
    const writable = await fileHandle.createWritable();

    // 4. Write the new content (this replaces the old content)
    await writable.write(newContent);

    // 5. Close the stream to save changes to disk
    await writable.close();
    
    console.log("File rewritten successfully.");
  } catch (err) {
    console.error("Error rewriting file:", err);
  }
    }

    async saveFile() {
    const handle = await window.showSaveFilePicker({
        suggestedName: 'test.txt',
    });
    const writable = await handle.createWritable();
    await writable.write('Привет, мир!');
    await writable.close();
}



    //delete obj._id;
}
export default new Utils