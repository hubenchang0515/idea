# Windows 读取硬件信息

## Win32_Processor 读取 CPU 型号

```c
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <wbemidl.h>

#pragma comment(lib, "wbemuuid.lib")
#pragma comment(lib, "ole32.lib")
#pragma comment(lib, "oleaut32.lib")

int main() {
    HRESULT hres;
    IWbemLocator *pLoc = NULL;
    IWbemServices *pSvc = NULL;
    IEnumWbemClassObject *pEnumerator = NULL;
    IWbemClassObject *pclsObj = NULL;
    ULONG uReturn = 0;
    BSTR bstrNamespace = NULL;
    BSTR bstrQuery = NULL;

    // 1. 初始化 COM
    hres = CoInitializeEx(NULL, COINIT_MULTITHREADED);
    if (FAILED(hres)) {
        printf("CoInitializeEx failed: 0x%08lx\n", hres);
        return 1;
    }

    // 2. 初始化 COM 安全性
    hres = CoInitializeSecurity(
        NULL, -1, NULL, NULL,
        RPC_C_AUTHN_LEVEL_DEFAULT,
        RPC_C_IMP_LEVEL_IMPERSONATE,
        NULL, EOAC_NONE, NULL
    );
    if (FAILED(hres) && hres != RPC_E_TOO_LATE) {
        // RPC_E_TOO_LATE 表示已初始化过安全性，可以忽略
        printf("CoInitializeSecurity failed: 0x%08lx\n", hres);
        CoUninitialize();
        return 1;
    }

    // 3. 创建 WMI 定位器
    hres = CoCreateInstance(
        &CLSID_WbemLocator,
        NULL,
        CLSCTX_INPROC_SERVER,
        &IID_IWbemLocator,
        (LPVOID*)&pLoc
    );
    if (FAILED(hres)) {
        printf("CoCreateInstance failed: 0x%08lx\n", hres);
        CoUninitialize();
        return 1;
    }

    // 4. 连接到 WMI 命名空间
    bstrNamespace = SysAllocString(L"ROOT\\CIMV2");
    if (bstrNamespace == NULL) {
        printf("SysAllocString failed\n");
        pLoc->lpVtbl->Release(pLoc);
        CoUninitialize();
        return 1;
    }

    hres = pLoc->lpVtbl->ConnectServer(
        pLoc,
        bstrNamespace,
        NULL, NULL, NULL, 0, NULL, NULL,
        &pSvc
    );
    SysFreeString(bstrNamespace);
    if (FAILED(hres)) {
        printf("ConnectServer failed: 0x%08lx\n", hres);
        pLoc->lpVtbl->Release(pLoc);
        CoUninitialize();
        return 1;
    }

    // 5. 设置代理安全级别
    hres = CoSetProxyBlanket(
        (IUnknown*)pSvc,
        RPC_C_AUTHN_WINNT,
        RPC_C_AUTHZ_NONE,
        NULL,
        RPC_C_AUTHN_LEVEL_CALL,
        RPC_C_IMP_LEVEL_IMPERSONATE,
        NULL,
        EOAC_NONE
    );
    if (FAILED(hres)) {
        printf("CoSetProxyBlanket failed: 0x%08lx\n", hres);
        pSvc->lpVtbl->Release(pSvc);
        pLoc->lpVtbl->Release(pLoc);
        CoUninitialize();
        return 1;
    }

    // 6. 执行 WQL 查询
    bstrQuery = SysAllocString(L"SELECT Name FROM Win32_Processor");
    if (bstrQuery == NULL) {
        printf("SysAllocString failed\n");
        pSvc->lpVtbl->Release(pSvc);
        pLoc->lpVtbl->Release(pLoc);
        CoUninitialize();
        return 1;
    }

    hres = pSvc->lpVtbl->ExecQuery(
        pSvc,
        L"WQL",
        bstrQuery,
        WBEM_FLAG_FORWARD_ONLY | WBEM_FLAG_RETURN_IMMEDIATELY,
        NULL,
        &pEnumerator
    );
    SysFreeString(bstrQuery);
    if (FAILED(hres)) {
        printf("ExecQuery failed: 0x%08lx\n", hres);
        pSvc->lpVtbl->Release(pSvc);
        pLoc->lpVtbl->Release(pLoc);
        CoUninitialize();
        return 1;
    }

    // 7. 遍历查询结果
    printf("CPU Model(s):\n");
    while (1) {
        hres = pEnumerator->lpVtbl->Next(pEnumerator, WBEM_INFINITE, 1, &pclsObj, &uReturn);
        if (uReturn == 0) {
            break;
        }

        VARIANT vtProp;
        VariantInit(&vtProp);

        hres = pclsObj->lpVtbl->Get(pclsObj, L"Name", 0, &vtProp, 0, 0);
        if (SUCCEEDED(hres)) {
            if (vtProp.vt == VT_BSTR && vtProp.bstrVal != NULL) {
                // 将 BSTR 转为宽字符输出
                wprintf(L"  %s\n", vtProp.bstrVal);
            }
            VariantClear(&vtProp);
        }

        pclsObj->lpVtbl->Release(pclsObj);
    }

    // 8. 清理资源
    pEnumerator->lpVtbl->Release(pEnumerator);
    pSvc->lpVtbl->Release(pSvc);
    pLoc->lpVtbl->Release(pLoc);
    CoUninitialize();

    return 0;
}
```