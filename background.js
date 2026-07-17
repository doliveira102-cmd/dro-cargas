const BOT_VERSION='10.0.0-alpha1';

chrome.runtime.onInstalled.addListener(()=>{
  console.log('DRO BOT V10 iniciado');
});

chrome.runtime.onStartup.addListener(()=>{
  console.log('DRO BOT V10 ativo');
});

chrome.runtime.onMessage.addListener((msg,sender)=>{
  if(msg?.tipo==='DRO_SYNC_RESULTADO'){
    chrome.storage.local.set({
      ultimaLeitura:new Date().toISOString(),
      ultimaPlataforma:msg.payload?.plataforma||'Desconhecida',
      versaoBOT:BOT_VERSION
    });

    if(sender.tab?.id){
      chrome.action.setBadgeText({
        tabId:sender.tab.id,
        text:String(msg.payload?.disponiveis?.length||0)
      }).catch(()=>{});
      chrome.action.setBadgeBackgroundColor({
        tabId:sender.tab.id,
        color:'#1565C0'
      }).catch(()=>{});
    }
  }
});
