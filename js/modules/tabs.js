function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, classActive){
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(tab => {
            tab.classList.remove(classActive);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabs[i].classList.add(classActive);
    }
    hideTabContent();
    showTabContent();
    let contInterval = 1;
    setInterval(()=>{
        hideTabContent();
        showTabContent(contInterval);
        if(contInterval >= 3){
            contInterval = 0; 
        }else{
            contInterval++;
        }
    },5000);
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });
}

export default tabs;