import { When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

When('I switch to new browser tab', async () => {
    await pageFixture.context.waitForEvent('page');
    
    const allPages = await pageFixture.context.pages();
  
    pageFixture.page = allPages[allPages.length - 1];
  
    await pageFixture.page.bringToFront();
  
    await pageFixture.page.setViewportSize( { width: 1920, height: 1080 } );
  });