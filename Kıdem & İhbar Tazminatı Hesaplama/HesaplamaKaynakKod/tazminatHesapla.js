            function hesapla(){         
                
                var baslamaTarihi= document.getElementById("iseBaslamaTarihi").value;
                var ayrilmaTarihi = document.getElementById("istenAyrilmaTarihi").value;
                
                var controlFlag = true;
                if(baslamaTarihi == "" || baslamaTarihi.length < 10){
                    document.getElementById("iseBaslamaTarihi").style.boxShadow = "0 0 2pt 2pt red";
                    controlFlag = false;
                }
                    
                if(ayrilmaTarihi == "" || ayrilmaTarihi.length < 10){
                    document.getElementById("istenAyrilmaTarihi").style.boxShadow = "0 0 2pt 2pt red";
                    controlFlag = false;
                } 
                
                if(baslamaTarihi != "" && ayrilmaTarihi != "" && ayrilmaTarihi < baslamaTarihi){
                   document.getElementById("istenAyrilmaTarihi").style.boxShadow = "0 0 2pt 2pt red";
                    alert("İşten ayrılma tarihi işe giriş tarihinden önce olamaz!");
                    controlFlag = false;
                }
                
                if(document.getElementById("brutMaas").value == ""){
                    document.getElementById("brutMaas").style.boxShadow = "0 0 2pt 2pt red";
                    controlFlag = false;
                }
                
                if(!controlFlag)
                    return false;
                
                var gunSayisi = (new Date(ayrilmaTarihi.substr(6,4),ayrilmaTarihi.substr(3,2),ayrilmaTarihi.substr(0,2)).getTime() - new Date(baslamaTarihi.substr(6,4),baslamaTarihi.substr(3,2),baslamaTarihi.substr(0,2)).getTime()) / (1000 * 3600 * 24)+1; 
				
                var brutMaas= document.getElementById("brutMaas").value;
                var ekUcret= document.getElementById("ekUcret").value == "" ? 0 : document.getElementById("ekUcret").value;
                var ikramiye= document.getElementById("ikramiye").value == "" ? 0 : document.getElementById("ikramiye").value;
                var matrah= document.getElementById("matrah").value;
                
                var totalBrut = parseFloat(brutMaas)+parseFloat(ekUcret)+parseFloat(ikramiye);
                
                // KIDEM
                
                var KidemeEsasUcret = totalBrut > 6730.15 ? 6730.15 : totalBrut;
                var brutKidemTazminati = KidemeEsasUcret / 365 * gunSayisi;
                
                brutKidemTazminati = gunSayisi >= 365 ? brutKidemTazminati : 0;
                
                var kidemDamgaVergisi =  brutKidemTazminati * 0.759 / 100;
                
                var netKidemTazminati = (brutKidemTazminati - kidemDamgaVergisi).toFixed(2);
            
                
                
                // IHBAR
                var ihbarSuresi = gunSayisi < 180 ? 14 : null;
                ihbarSuresi = gunSayisi >= 180 && gunSayisi < 540 ? 28 : ihbarSuresi;
                ihbarSuresi = gunSayisi >= 540 && gunSayisi < 1080 ? 42 : ihbarSuresi;
                ihbarSuresi = gunSayisi >= 1080 ? 56 : ihbarSuresi;
                
                var brutIhbarTazminati = totalBrut * 12 / 360 * ihbarSuresi;
                
                var ihbarDamgaVergisi = (brutIhbarTazminati * 0.759 / 100).toFixed(2);
                
                matrah = matrah == "" ? 0 : matrah;
                
                var ihbarGelirVergisiOrani = 0
                if( matrah >= 0 && matrah < 22000){
                    ihbarGelirVergisiOrani = 0.15
                }
                else if(matrah >= 22000 && matrah < 49000){
                    ihbarGelirVergisiOrani = 0.20;
                }
                 else if(matrah >= 49000 && matrah < 180000){
                    ihbarGelirVergisiOrani = 0.27;
                }
                 else if(matrah >= 180000 && matrah < 600000){
                    ihbarGelirVergisiOrani = 0.35;
                }
                else{
                    ihbarGelirVergisiOrani = 0.40;
                }
                
                var ihbarGelirVergisi = brutIhbarTazminati * ihbarGelirVergisiOrani;
                var netIhbarTazminati = (brutIhbarTazminati - ihbarDamgaVergisi - ihbarGelirVergisi).toFixed(2);
                
                //TOPLAM NET TAZMİNAT
                document.getElementById("netToplam").innerHTML = ((parseFloat(netIhbarTazminati) + parseFloat(netKidemTazminati)).toFixed(2)).concat(" TL");
                
                //KIDEM TABLOSU 
                document.getElementById("kidemSuresi").innerHTML = gunSayisi + " Gün";
                document.getElementById("brutKidem").innerHTML = brutKidemTazminati.toFixed(2) + " TL";
                document.getElementById("kidemDamgaVergisi").innerHTML = kidemDamgaVergisi.toFixed(2) + " TL";
                document.getElementById("netKidem").innerHTML = netKidemTazminati + " TL";
                
                // iHBAR TABLOSU
                document.getElementById("ihbarSuresi").innerHTML = ihbarSuresi + " Gün";
                document.getElementById("brutIhbar").innerHTML = brutIhbarTazminati.toFixed(2) + " TL";
                document.getElementById("ihbarGelirVergisi").innerHTML = ihbarGelirVergisi.toFixed(2) + " TL";
                document.getElementById("ihbarDamgaVergisi").innerHTML = ihbarDamgaVergisi + " TL";
                document.getElementById("netIhbar").innerHTML = netIhbarTazminati + " TL";
                
                document.getElementById("mainResultDivId").style.display =     "grid";
                document.getElementById("kidemTable").hidden = false;
                document.getElementById("ihbarTable").hidden = false;
                window.scrollTo({
                        top: 290,
                   behavior: 'smooth'
                }); 

            }
            
            function dateOnChange(event){
                if(["iseBaslamaTarihi","istenAyrilmaTarihi"].includes(event.id) ){
                    document.getElementById(event.id).style.boxShadow = "";
                }
            }

            function dateOnKeyUp(event){
                
                if((event.value.charAt(event.value.length-1) >= 0 && event.value.charAt(event.value.length-1) <= 9) || event.value.charAt(event.value.length-1) == "/" ){
                    
                }
                else{
                    event.value = event.value.length == 1 ? "" : event.value.slice(0,event.value.length-1);
                    return false;
                }
            
                
                var theDate = event.value.split("/");  
                
                switch (theDate.length){
                    case 0:
                        break; 
                    case 1:
                        if (checkDay(theDate[0]) == false){
                            event.value = event.value.slice(0,1);
                            return false;
                        }
                        if (theDate[0].length > 1){
                            event.value = (event.value + "/");
                        }
                        else{
                            event.value = theDate[0] > 3 ? ("0" + event.value + "/") : event.value;
                            
                        }
                        break; 
                    case 2:
                        if (theDate[0] == "" || theDate[0].length ==0 ){
                            return false;
                        }
                        if (checkDay (theDate[0]) == false){
                            return false;
                        }
                        if (checkMonth(theDate[1]) == false){
                            event.value = event.value.slice(0,4);
                            return false;
                        }
                        if (theDate[1].length > 1)
                            event.value = (event.value + "/");
                        else if(theDate[1].length == 1 && parseInt(theDate[1]) > 3 )
                            event.value = ( theDate[0] + "/0"+theDate[1]+"/");
                        break; 
                    case 3:
                        if (theDate[0] == "" || theDate[0].length ==0 ){
                            
                            return false;
                        }
                        if (theDate[1] == "" || theDate[1].length ==0 ){
                            
                            return false;
                        }
                        if (checkDay (theDate[0]) == false){
                            
                            return;
                        }
                        if (checkMonth(theDate[1]) == false){
                            
                            return;
                        }
                        if (theDate[1].length == 1){
                            event.value = ( theDate[0] + "/0"+theDate[1]+"/" + theDate[2]);
                        }
                        if (checkYear(theDate[2]) == false){
                            
                            return;
                        }
                        return true;
                        break; 
                    default:
                    break;
                } 
            }

            function checkDay (d){
                var MAXDAY = 31;
                if (d.length ==0 || d == ""){
                    return false; 
                }
                for (var i = 0 ; i < d.length ; i++){
                    if (d.charAt(i) > "9" || d.charAt(i) < "0"   )  {
                        return false; 
                    }
                }
                if(parseInt(d) > MAXDAY || parseInt(d) < 1){
                    return false;
                }
                if(d.length > 2){
                    return false;
                }
                return true;
            }
            function checkMonth (m){
                var MAXMONTH = 12;
                if (m.length == 0 || m == ""){
                    return false
                }
                for (var i = 0 ; i < m.length ; i++){
                    if (m.charAt(i) > "9" || m.charAt(i) < "0"   )  {
                        return false; 
                    }
                }
                if(parseInt(m) > MAXMONTH || parseInt(m) < 1){
                    return false;
                }
                if(m.length > 2){
                    return false;
                }
                return true;
            }
            function checkYear (y){
                if (y.length == 0 || y == ""){
                    return false;
                }
                var MAXYEAR =  new Date();
                MAXYEAR = MAXYEAR.getFullYear(); 
                for (var i = 0 ; i < y.length ; i++){
                    if (y.charAt(i) > "9" || y.charAt(i) < "0")     {
                        return false;
                    }
                }
                if(parseInt(y) < 1900 || parseInt(y) > MAXYEAR){
                    return false; 
                }
                if(y.length > 4){
                    return false;
                }
                return true;
            }
            
            function setTwoNumberDecimal(event) {
                
                if(event.id == "brutMaas"  ){
                    document.getElementById(event.id).style.boxShadow = "";
                }
                
                
                
                var inputNumber = event.value.split(".")[0];
                var precision = event.value.split(".")[1];
                
                if (inputNumber.length > event.maxLength){
                    inputNumber = inputNumber.slice(0,event.maxLength);
                }   
                
                if(precision != undefined){
                    
                    if(precision.length>2){
                        precision = precision.slice(0,2);
                    }
                    event.value = inputNumber.concat(".").concat(precision);
                }
                else{
                    event.value = inputNumber;
                }
            }
            
            function dateDiff(startDate,stopDate){
                
                var daysOfMonths = [0,31,28,31,30,31,30,31,31,30,31,30,31];
                
                var diffYear = 0;
                if(stopDate.slice(5,7) >= startDate.slice(5,7)){
                    diffYear = stopDate.slice(0,4) - startDate.slice(0,4);
                    if(stopDate.slice(5,7) == startDate.slice(5,7) && stopDate.slice(8,10) < startDate.slice(8,10)){
                        diffYear--;
                    }
                    
                }
                else{
                    diffYear = stopDate.slice(0,4) - startDate.slice(0,4) - 1;
                }
                diffYear < 0 ? diffYear = 0 : null;
                
                var diffMonth = 0;
                if(stopDate.slice(8,10) >= startDate.slice(8,10)){
                    if(stopDate.slice(5,7) >= startDate.slice(5,7)){
                        diffMonth = stopDate.slice(5,7) - startDate.slice(5,7);  
                    }
                    else{
                        diffMonth = parseInt(stopDate.slice(5,7)) + 12 - parseInt(startDate.slice(5,7));
                    }
                    
                }
                else{
                    if(stopDate.slice(5,7) >= startDate.slice(5,7)){
                        if(stopDate.slice(5,7) == startDate.slice(5,7) && stopDate.slice(8,10) < startDate.slice(8,10)){
                            diffMonth = 11; 
                        }
                        else{
                            diffMonth = stopDate.slice(5,7) - startDate.slice(5,7)-1; 
                        }
                         
                    }
                    else{
                        diffMonth = parseInt(stopDate.slice(5,7)) + 12 - parseInt(startDate.slice(5,7)) -1;
                    }
                    diffMonth < 0 ? diffMonth = 0 : null;
                }
                
                var diffDay = 0;
                if(stopDate.slice(8,10) >= startDate.slice(8,10)){
                    diffDay = stopDate.slice(8,10) - startDate.slice(8,10);
                }
                else{
                    diffDay = daysOfMonths[stopDate.slice(5,7)-1]-parseInt(startDate.slice(8,10)) + parseInt(stopDate.slice(8,10));
                    
                    if(stopDate.slice(5,7) == "03" && stopDate.slice(0,4)%4 == 0){
                        diffDay++;
                    }
                }
                
                
                return diffYear + " Yıl " + diffMonth + " Ay " + diffDay + " Gün";
            }