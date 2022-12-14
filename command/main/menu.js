//WM JANGAN DI HAPUS DEKK

const { monospace } = require('../../lib/function')
const fs = require("fs");
let multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");
const moment = require("moment");
const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = {
  name: ['menu'].map((v) => v + ''),
  alias: ["cmd","menu"],
  category: "main",
  desc: "Menampilkan command",
  async run({conn, msg},{map, q}){
    let { body , reply} = msg
    let pref = multi_pref.test(body) ? body.split("").shift() : ".";
    let locale = "id"
    let d = new Date(new Date() + 3600000)
    let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    const { pushName, sender } = msg;
    const { prefix, command } = map;
    const cmds = command.keys();
    let category = [];

    try {
      if(q){
        for(const cmd of cmds){
          let info = command.get(cmd);
          if (!cmd) continue;
	  if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
          cteg = info.category || "No Category";
	  if (info.type == "changelog") continue;
	  if (!cteg || cteg === "private") cteg = "owner";
	  if (Object.keys(category).includes(cteg)) category[cteg].push(info);
          else {
	    category[cteg] = [];
	    category[cteg].push(info);
         }
        }
                        teks = global.footer + " *[ BOTWA]*\n\n"
		  	teks += monospace(" β Library : Baileys-MD") + "\n"
		  	teks += monospace(" β Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
		  	teks += monospace(" β Prefix : [ " + pref + " ]") + "\n\n"
		  	teks += monospace(`Halo, @${sender.split("@")[0]} Here my Command`) +`\n\n`;
		  	teks += `*δΉ ${q.toUpperCase()}*\n`
		  	nganu = category[q]
		  	if(nganu == undefined) throw "Category tidak ditemukan!!"
        for(let i of nganu){
          teks += monospace(` Γ ${pref + i.name} ${map.lockcmd.get(i.name) ? "β" : ""}`) + "\n"
        }
        teks += "\n*Bot WhatsApp Multi Device*"
        msg.reply(teks,{withTag: true})
      } else {
        for (let cmd of cmds){
          let info = command.get(cmd);
	  if (!cmd) continue;
	  if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
	  cteg = info.category || "No Category";
	  if (info.type == "changelog") continue;
          if (!cteg || cteg === "private") cteg = "owner";
          if (Object.keys(category).includes(cteg)) category[cteg].push(info);
	  else {
		category[cteg] = [];
                category[cteg].push(info);
          }
        }
			menu = global.footer + " *[ BOTWA ]*\n\n"
			menu += monospace(" β Library : Baileys-MD") + "\n"
			menu += monospace(" β Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" β Prefix : [ " + pref + " ]") + "\n"
			menu += monospace(" β Date : " + date) + "\n"
			menu += monospace(" β Time : " + time) + "\n"
		        menu += monospace(" β Speed :  " + processTime(msg.messageTimestamp, moment()) + " Seccond") + "\n\n"
		        menu += "*This Bot script is : https://github.com*\n_Tanda β berarti Error atau Fitur sedang Dinonaktifkan oleh Owner!!_\n\n"
			menu += monospace(`Halo, @${sender.split("@")[0]} Here my Command List`) +`\n\n`;
			const keys = Object.keys(category)
			menu += "*δΉ CATEGORY MENU*\n"
			for(let o of keys){
			  menu += monospace(` Γ ${pref + msg.command} ${o}`) + "\n"
			}
			menu += "\n"
			for(let key of keys){
			  menu += `*δΉ ${key.toUpperCase()}*\n`
			  menu += `${category[key].map((cmd) => monospace(` Γ ${cmd.options.noPrefix ? "" : pref}${cmd.name} ${map.lockcmd.get(cmd.name) ? "β" : ""}`)).join("\n")} ` + "\n\n"
			}
                        menu += `Β© 2022`
			menu += `_Note : Ketik ${prefix}help <command> untuk melihat info command_`
			
			const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Owner'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Speed'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://telegra.ph/file/642a95448d0d2d4750a37.jpg"},
           caption: menu,
           footer: "Bot WhatsApp Multi Device",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
