using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.PhantomJS;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.Extensions;

namespace DotNetBridgeNode
{
    public class PhantomJSHelper
    {
        public static void Init(int port)
        {
            //https://docs.google.com/presentation/d/1kBqhlcI1T4eGlFRFzt2Q5Dlk-lOW0OhQJJcpRUhz7Os/edit?pli=1#slide=id.ge0b728e0_00
            var path =
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\", "")
                    .Replace("bin\\Relase", "").Replace("DotNetBridgeNode", "")) + @"packages\PhantomJS.2.0.0\tools\phantomjs\phantomjs.exe";

            Process.Start(path, string.Format("--webdriver={0} --disk-cache=true --max-disk-cache-size=524288 --load-images=true --webdriver-loglevel=NONE", port));
        }

        public static string Fetch(string url,string jquerySelector)
        {
            var uri = new Uri("http://127.0.0.1:8888/wd/hub");
            var capabilities = DesiredCapabilities.PhantomJS();
            capabilities.IsJavaScriptEnabled = true;
            capabilities.SetCapability("loadImages",false);
            /*
            "XSSAuditingEnabled": false,
   "javascriptCanCloseWindows": true,
   "javascriptCanOpenWindows": true,
   "javascriptEnabled": true,
   "loadImages": true,
   "localToRemoteUrlAccessEnabled": false,
   "userAgent": "... AppleWebKit/534.34 ... PhantomJS/1.9.0 (development) ...",
   "webSecurityEnabled": true
            
            */
            //设置环境变量
            //capabilities.SetCapability();
            //http://ju.outofmemory.cn/entry/32503
            //http://www.haodaima.net/art/2821139
            //https://github.com/browserstack/automate-csharp-samples/tree/master/pnunit-sample

            using (IWebDriver webDriver = new RemoteWebDriver(uri, capabilities))
            {
                var nav = webDriver.Navigate();


                //you can delete specific cookie using:
                //webDriver.Manage().Cookies.DeleteCookieNamed("");

                //and to delete all the cookies using:
                //webDriver.Manage().Cookies.DeleteAllCookies();


                nav.GoToUrl(url);
                var webElements =
                    webDriver.WaitUntil((x) => x.FindElements(OpenQA.Selenium.Extensions.By.JQuerySelector(jquerySelector)));
                if (webElements == null)
                {
                    return string.Empty;
                }
                else
                {
                    //var image = webDriver.TakeScreenshot();
                    //image.SaveAsFile(AppDomain.CurrentDomain.BaseDirectory + "//1.jpeg", ImageFormat.Jpeg);
                    return webDriver.PageSource;
                }

                
            }
        }
    }
}
