# Windows API 根据进程 ID 查找窗口的 HWND

在 Windows API 中，从进程 ID (PID) 获取窗口句柄 (HWND) 并没有一个直接的单一步骤函数（如 `GetWindowByPid`），因为一个进程可能拥有多个顶级窗口，也可能完全没有窗口。

通常的做法是**枚举系统中的所有顶级窗口**，并检查每个窗口所属的进程 ID 是否与目标 PID 匹配。

## 核心实现逻辑

最标准且高效的方法是使用 `EnumWindows` 函数。

1. **定义一个结构体**：用于在回调函数中存储目标 PID 和返回的 HWND。
2. **调用 `EnumWindows`**：该函数会遍历屏幕上的所有顶级窗口。
3. **编写回调函数**：
    * 使用 `GetWindowThreadProcessId` 获取当前枚举窗口的 PID。
    * 对比该 PID 与目标 PID。
    * 如果匹配，检查是否是主窗口（通常通过 `IsWindowVisible` 或 `GetWindow(hwnd, GW_OWNER)` 进一步筛选）。
    * 保存 HWND 并停止枚举。


## C++ 代码示例

```cpp
#include <windows.h>
#include <iostream>

// 用于传递数据给回调函数的结构体
struct EnumData {
    DWORD targetPid;
    HWND hWnd;
};

// EnumWindows 的回调函数
BOOL CALLBACK EnumWindowsProc(HWND hWnd, LPARAM lParam) {
    EnumData* data = (EnumData*)lParam;
    DWORD windowPid = 0;

    // 获取该窗口所属的进程 ID
    GetWindowThreadProcessId(hWnd, &windowPid);

    // 如果 PID 匹配 且 是主窗口（没有所有者）
    if (windowPid == data->targetPid && GetWindow(hWnd, GW_OWNER) == NULL && IsWindowVisible(hWnd)) {
        data->hWnd = hWnd;
        return FALSE; // 找到目标，停止枚举
    }

    return TRUE; // 继续枚举
}

HWND GetHwndByPid(DWORD pid) {
    EnumData data;
    data.targetPid = pid;
    data.hWnd = NULL;

    EnumWindows(EnumWindowsProc, (LPARAM)&data);

    return data.hWnd;
}

int main() {
    DWORD pid = 1234; // 替换为你的目标 PID
    HWND hWnd = GetHwndByPid(pid);

    if (hWnd) {
        std::cout << "找到窗口句柄: " << hWnd << std::endl;
    } else {
        std::cout << "未找到该进程的窗口。" << std::endl;
    }
    return 0;
}

```

## 关键函数说明

| 函数 | 作用 |
| --- | --- |
| **`EnumWindows`** | 枚举屏幕上所有的顶级窗口，每发现一个窗口就调用一次回调函数。 |
| **`GetWindowThreadProcessId`** | 获取创建指定窗口的线程 ID，并通过输出参数返回**进程 ID**。 |
| **`IsWindowVisible`** | 确保你找到的是用户能看到的窗口，而不是进程创建的隐藏辅助窗口。 |
| **`GetWindow(hWnd, GW_OWNER)`** | 检查窗口是否有所有者。通常“主窗口”没有所有者（返回 NULL）。 |
