document.addEventListener('DOMContentLoaded', function() {
    // All our code goes here
    //Variables from the slider
    let slider = document.getElementById('myRange');
    let sliderValue = slider.value;
    let valueDisplay = document.getElementById('length-value');
    //Copy function
    let copy = document.getElementById('copy')

    //Variables from the checkbox
    let check_upperCase = document.getElementById('include-upp-case');
    let check_upperCase_value = check_upperCase.checked;
    let check_lowerCase = document.getElementById('include-low-case');
    let check_lowerCase_value = check_lowerCase.checked;
    let check_numbers = document.getElementById('include-numbers');
    let check_numbers_value = check_numbers.checked;
    let check_symbols = document.getElementById('include-symbols');
    let check_symbols_value = check_symbols.checked;
    //Variables for the submit button
    let generateButton = document.getElementById('generate-button')
    let generatedPassword = document.getElementById('generatedPassword')
    let passwordStorage = "";
    let strengthStorage = "";
    let category = document.getElementById('category')
    let bar4 = document.getElementById('bar4');
    let bar3 = document.getElementById('bar3');
    let bar2 = document.getElementById('bar2');
    let bar1 = document.getElementById('bar1');



    

    // Update display when slider changes
    slider.addEventListener('input', function() {
      valueDisplay.innerText = this.value;
      sliderValue = this.value;
    });

    //Copy password
    copy.addEventListener('click', function(){
        navigator.clipboard.writeText(passwordStorage)
        .then(() => alert('Copiado en el portapapeles!'))
        .catch(err => console.error('Falla al copiar:', err));
    });

    

//update the variables for the checkbox everytime the user changes them

    check_upperCase.addEventListener('change', function() {
        check_upperCase_value = this.checked;
        console.log('Updated value:', check_upperCase_value); // Verify updates
    });

    check_lowerCase.addEventListener('change', function() {
        check_lowerCase_value = this.checked;
        console.log('Updated value:', check_lowerCase_value); // Verify updates
    });

    check_numbers.addEventListener('change', function() {
        check_numbers_value = this.checked;
        console.log('Updated value:', check_numbers_value); // Verify updates
    });

    check_symbols.addEventListener('change', function() {
        check_symbols_value = this.checked;
        console.log('Updated value:', check_symbols_value); // Verify updates
    });


    generateButton.addEventListener('click', function() {
        generatePassword (sliderValue, check_upperCase_value, check_lowerCase_value, check_numbers_value, check_symbols_value);
        generatedPassword.innerText = passwordStorage;
        strengthStorage = evaluatePasswordStrength(passwordStorage);
        console.log(strengthStorage);
        category.innerText = strengthStorage;

        if (strengthStorage == "strong"){
            bar4.style.backgroundColor = "var(--clr-theme)";
            bar3.style.backgroundColor = "var(--clr-theme)";
            bar2.style.backgroundColor = "var(--clr-theme)";
            bar1.style.backgroundColor = "var(--clr-theme)";

        }

        if(strengthStorage == "medium"){
            bar4.style.backgroundColor = "var(--clr-grey)";
            bar3.style.backgroundColor = "var(--clr-grey)";
            bar2.style.backgroundColor = "var(--clr-theme)";
            bar1.style.backgroundColor = "var(--clr-theme)";
        };

        if(strengthStorage == "weak"){
            bar4.style.backgroundColor = "var(--clr-grey)";
            bar3.style.backgroundColor = "var(--clr-grey)";
            bar2.style.backgroundColor = "var(--clr-grey)";
            bar1.style.backgroundColor = "var(--clr-theme)";
        };

    });

    //Function created with deepseek

    function generatePassword(length, upper, lower, numb, symb) {
        // Define character sets
        const chars = {
          upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          lower: 'abcdefghijklmnopqrstuvwxyz',
          numb: '0123456789',
          symb: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
      
        // Build available characters string
        let availableChars = '';
        if (upper) availableChars += chars.upper;
        if (lower) availableChars += chars.lower;
        if (numb) availableChars += chars.numb;
        if (symb) availableChars += chars.symb;
      
        // Validate at least one character type is selected
        if (!availableChars) throw new Error('At least one character type must be enabled');
      
        // Generate password
        let password = '';
        for (let i = 0; i < length; i++) {
          password += availableChars[Math.floor(Math.random() * availableChars.length)];
        }
        
        console.log(password)
        passwordStorage = password;
        return password;
      }

      //Password evaluation, build with deepseek

      function evaluatePasswordStrength(password) {
        const length = password.length;
        let score = 0;
      
        // 1. Length Criteria (Max 35 points)
        if (length >= 14) score += 35;
        else if (length >= 12) score += 25;
        else if (length >= 10) score += 15;
        else if (length >= 8) score += 10;
        else score += 5;
      
        // 2. Character Diversity (Max 40 points)
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);
      
        const diversityCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
        score += diversityCount * 10; // 10 points per character type
      
        // 3. Entropy/Uniqueness (Max 25 points)
        const uniqueChars = new Set(password).size;
        score += Math.min(25, Math.floor((uniqueChars / length) * 25));
      
        // Adjusted Thresholds for 15-char max
        if (score >= 80) return 'strong';
        if (score >= 60) return 'medium';
        return 'weak';
      }

  });