// ============================================================================
// CHROME DEVTOOLS DEMONSTRATION PROJECT
// COMP484 - Virtual Pet with Debugging Examples
// ============================================================================

// Wait for page to load before running code
$(function() { 
    
    // ========================================================================
    // CONSOLE LOGGING EXAMPLES
    // ========================================================================
    
    // 1. LOG INFO - General information messages
    console.log('%c🐕 Giga Pet Initialized', 'color: #4CAF50; font-size: 16px; font-weight: bold');
    console.log('Page loaded successfully at:', new Date().toLocaleTimeString());
    
    // 2. LOG WARNING - Non-critical issues
    console.warn('⚠️ Warning: Pet happiness should stay above 20 for optimal health');
    
    // 3. LOG ERROR - Critical issues (we'll trigger this later with button)
    // console.error('❌ This is an example error message');
    
    // 4. LOG CUSTOM - Styled console messages
    console.log('%cWelcome to Giga Pet!', 
        'background: linear-gradient(to right, #667eea, #764ba2); color: white; padding: 10px; border-radius: 5px; font-size: 14px');
    console.log('%c💡 TIP: Open DevTools Console to see all debug messages!', 
        'color: #FF9800; font-style: italic');
    
    // 5. LOG GROUP - Grouped console messages
    console.group('📊 Initial Pet Statistics');
    console.log('Name:', pet_info.name);
    console.log('Weight:', pet_info.weight, 'pounds');
    console.log('Happiness:', pet_info.happiness, 'tail wags/min');
    console.log('Energy:', pet_info.energy + '%');
    console.groupEnd();
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    // Show initial values
    checkAndUpdatePetInfoInHtml();
    
    // Log initialization complete
    console.info('✅ Pet dashboard initialized successfully');
    
    // Connect buttons to functions
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.sleep-button').click(clickedSleepButton);
    
    // Debug control buttons
    $('.trigger-error').click(triggerTypeError);
    $('.trigger-violation').click(triggerViolation);
    $('.show-table').click(showStatsTable);
    $('.reset-pet').click(resetPet);
    
    // JQUERY METHOD 1: .hover()
    // Detects when mouse enters and leaves buttons to make them interactive
    $('button').hover(
        function() {
            $(this).css('opacity', '0.8');
            // Log hover events (can be filtered in DevTools)
            console.debug('Button hover:', $(this).text().trim());
        },
        function() {
            $(this).css('opacity', '1');
        }
    );
    
    // Track interaction count
    window.interactionCount = 0;
    
    console.log('%c🎮 All event listeners attached', 'color: #2196F3');
});

// ========================================================================
// PET DATA OBJECT
// ========================================================================

// Object that holds all pet data
// BREAKPOINT OPPORTUNITY: Set breakpoint here to inspect initial values
var pet_info = {
    name: "Buddy", 
    weight: 15, 
    happiness: 50,
    energy: 70,
    created: new Date()
};

// ========================================================================
// INTERACTION FUNCTIONS
// ========================================================================

// Treat button - pet gets happy but gains weight
// BREAKPOINT OPPORTUNITY: Step through this function to see variable changes
function clickedTreatButton() {
    console.group('🦴 Treat Button Clicked');
    
    // Log values BEFORE changes
    console.log('Before:', { 
        happiness: pet_info.happiness, 
        weight: pet_info.weight 
    });
    
    pet_info.happiness = pet_info.happiness + 10;
    pet_info.weight = pet_info.weight + 2;
    
    // Log values AFTER changes
    console.log('After:', { 
        happiness: pet_info.happiness, 
        weight: pet_info.weight 
    });
    
    // Warning if weight gets too high
    if (pet_info.weight > 25) {
        console.warn('⚠️ Warning: Pet weight is getting high! Consider more exercise.');
    }
    
    console.groupEnd();
    
    showPetMessage("Yummy! Thanks for the treat! 🦴");
    checkAndUpdatePetInfoInHtml();
    trackInteraction('treat');
}

// Play button - pet gets happy and burns calories
function clickedPlayButton() {
    console.group('🎾 Play Button Clicked');
    
    const before = { ...pet_info };
    
    pet_info.happiness = pet_info.happiness + 15;
    pet_info.weight = pet_info.weight - 1;
    pet_info.energy = pet_info.energy - 10;
    
    console.log('Stats changed:', {
        happiness: `${before.happiness} → ${pet_info.happiness}`,
        weight: `${before.weight} → ${pet_info.weight}`,
        energy: `${before.energy} → ${pet_info.energy}`
    });
    
    console.groupEnd();
    
    showPetMessage("That was fun! Let's play again! 🎾");
    checkAndUpdatePetInfoInHtml();
    trackInteraction('play');
}

// Exercise button - pet loses weight but gets tired
function clickedExerciseButton() {
    console.group('🏃 Exercise Button Clicked');
    
    pet_info.happiness = pet_info.happiness - 5;
    pet_info.weight = pet_info.weight - 3;
    pet_info.energy = pet_info.energy - 15;
    
    // Check for low energy
    if (pet_info.energy < 20) {
        console.error('❌ Critical: Pet energy is very low! Pet needs rest.');
    }
    
    console.log('Current energy level:', pet_info.energy + '%');
    console.groupEnd();
    
    showPetMessage("Whew, I'm tired now... 😮‍💨");
    checkAndUpdatePetInfoInHtml();
    trackInteraction('exercise');
}

// Sleep button - restores energy
function clickedSleepButton() {
    console.group('😴 Sleep Button Clicked');
    
    const energyBefore = pet_info.energy;
    pet_info.energy = pet_info.energy + 25;
    pet_info.happiness = pet_info.happiness - 3;
    
    console.log(`Energy restored: ${energyBefore}% → ${pet_info.energy}%`);
    console.info('💤 Pet is well-rested!');
    
    console.groupEnd();
    
    showPetMessage("Zzzzz... That nap felt great! 😴");
    checkAndUpdatePetInfoInHtml();
    trackInteraction('sleep');
}

// ========================================================================
// DEBUG CONTROL FUNCTIONS
// ========================================================================

// Trigger a TypeError for debugging demonstration
// BREAKPOINT OPPORTUNITY: Set breakpoint here to examine error conditions
function triggerTypeError() {
    console.group('🐛 Triggering TypeError for DevTools Demo');
    console.log('Attempting to call undefined method...');
    
    try {
        // Intentional error: calling method on undefined
        var undefinedObject;
        undefinedObject.someMethod();
    } catch (error) {
        console.error('❌ TypeError caught:', error.message);
        console.error('Stack trace:', error.stack);
    }
    
    console.groupEnd();
}

// Trigger a violation warning
function triggerViolation() {
    console.group('⚠️ Triggering Violation Warning');
    console.log('Running long-running operation...');
    
    // Force a long-running operation that will trigger a violation warning
    const start = Date.now();
    while (Date.now() - start < 200) {
        // Busy wait to trigger "Long Task" violation
    }
    
    console.log('Operation complete (this should trigger a violation warning)');
    console.groupEnd();
}

// 6. LOG TABLE - Display data in table format
function showStatsTable() {
    console.group('📊 Pet Statistics Table');
    
    // Create array of stat objects for table display
    const stats = [
        { Stat: 'Name', Value: pet_info.name, Unit: '-' },
        { Stat: 'Weight', Value: pet_info.weight, Unit: 'pounds' },
        { Stat: 'Happiness', Value: pet_info.happiness, Unit: 'wags/min' },
        { Stat: 'Energy', Value: pet_info.energy, Unit: '%' }
    ];
    
    console.table(stats);
    
    // Also show as object for comparison
    console.log('Same data as object:');
    console.table(pet_info);
    
    console.groupEnd();
}

// Reset pet to initial state
function resetPet() {
    console.group('🔄 Resetting Pet');
    
    const oldValues = { ...pet_info };
    
    pet_info.name = "Buddy";
    pet_info.weight = 15;
    pet_info.happiness = 50;
    pet_info.energy = 70;
    
    console.log('Reset complete:');
    console.table([
        { Stat: 'Name', Before: oldValues.name, After: pet_info.name },
        { Stat: 'Weight', Before: oldValues.weight, After: pet_info.weight },
        { Stat: 'Happiness', Before: oldValues.happiness, After: pet_info.happiness },
        { Stat: 'Energy', Before: oldValues.energy, After: pet_info.energy }
    ]);
    
    console.groupEnd();
    
    checkAndUpdatePetInfoInHtml();
    showPetMessage("Back to feeling fresh! 🔄");
}

// ========================================================================
// HELPER FUNCTIONS
// ========================================================================

function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();  
    updatePetInfoInHtml();
}

// Make sure values don't go negative
// BREAKPOINT OPPORTUNITY: Watch how conditionals work
function checkWeightAndHappinessBeforeUpdating() {
    let modified = false;
    
    if (pet_info.weight < 0) {
        console.warn('Correcting negative weight:', pet_info.weight, '→ 0');
        pet_info.weight = 0;
        modified = true;
    }
    
    if (pet_info.happiness < 0) {
        console.warn('Correcting negative happiness:', pet_info.happiness, '→ 0');
        pet_info.happiness = 0;
        modified = true;
    }
    
    if (pet_info.energy < 0) {
        console.warn('Correcting negative energy:', pet_info.energy, '→ 0');
        pet_info.energy = 0;
        modified = true;
    }
    
    if (modified) {
        console.info('Values normalized to prevent negative stats');
    }
}

// Update the HTML with current values
function updatePetInfoInHtml() {
    $('.name').text(pet_info['name']);
    $('.weight').text(pet_info['weight']);
    $('.happiness').text(pet_info['happiness']);
    $('.energy').text(pet_info['energy']);
    
    // Log update to console
    console.debug('DOM updated with current pet stats');
}

// Show message from pet
function showPetMessage(message) {
    // JQUERY METHOD 2: .slideDown()
    // Makes the message box appear with a sliding animation
    
    console.log('💬 Pet says:', message);
    
    $('.pet-message').text(message);
    $('.pet-message').slideDown(400);
    
    // Hide message after 3 seconds
    setTimeout(function() {
        $('.pet-message').slideUp(400);
    }, 3000);
}

// Track user interactions
function trackInteraction(actionType) {
    window.interactionCount++;
    
    console.log('%c📈 Interaction Logged', 'color: #9C27B0; font-weight: bold');
    console.log('Action:', actionType);
    console.log('Total interactions:', window.interactionCount);
    console.log('Timestamp:', new Date().toLocaleTimeString());
    
    // Log milestone interactions
    if (window.interactionCount === 10) {
        console.log('%c🎉 Milestone: 10 interactions!', 
            'background: #FFD700; color: #000; padding: 5px; font-weight: bold');
    }
}

// ========================================================================
// BROWSER-GENERATED MESSAGES
// ========================================================================

// The following will generate browser console messages:
// 1. 404 Error - from nonexistent-file.js in index.html
// 2. TypeError - from triggerTypeError() function
// 3. Violation - from triggerViolation() function

// ========================================================================
// DEBUGGING TIPS (visible in DevTools)
// ========================================================================

console.group('🔧 Debugging Tips');
console.log('1. Set breakpoints on any function to step through code');
console.log('2. Use "Watch Expressions" to monitor pet_info object');
console.log('3. Check "Scope" pane to see all variables in context');
console.log('4. Filter console by level: Info, Warnings, Errors');
console.log('5. Use regex filter: /pet|stat/ to filter messages');
console.groupEnd();

// Make pet_info accessible in console for debugging
window.pet_info = pet_info;
console.log('%c💡 Tip: Type "pet_info" in console to inspect pet data', 
    'color: #00BCD4; font-style: italic');
