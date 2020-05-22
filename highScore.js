// A work in progress

// This is the basic algorithm for sorting duplicates

/*

    let sortingArr = arr => { 
        arr.sort();
        let current = null;
        let counter = 0; 
        for (let i = 0; i < arr.length; i++) {  
            if (arr[i] != current) {
                if (counter > 0) {
                    document.write(current + ' -->' + counter + ' times<br>');
                }
                current = arr[i];
                counter = 1;
            } else {
                counter++;
            }
        }
        if (counter > 0) {
            document.write(current + '--> ' + counter + ' times');
        } 
    }  

*/ 