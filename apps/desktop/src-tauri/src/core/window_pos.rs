use mouse_position::mouse_position::Mouse;
use tauri::{AppHandle, Manager, Monitor, PhysicalPosition, WebviewWindow};

pub fn window_pos(app: AppHandle, is_shortcut: bool) {
    if let Some(main_window) = app.get_webview_window("main") {
        let pos = Mouse::get_mouse_position();
        match pos {
            Mouse::Position { x, y } => {
                let target_monitor = find_target_monitor(&main_window, x, y);
                if let Some(monitor) = target_monitor {
                    let monitor_pos = monitor.position();
                    let monitor_height = monitor.size().height as f32;
                    let monitor_width = monitor.size().width as f32;

                    if is_shortcut {
                        let percent_of_h = 0.6; // 60% of the height
                        let optimal_height = percent_of_h * monitor_height;
                        let y_after_padding: i32 = if y > optimal_height as i32 {
                            optimal_height as i32
                        } else {
                            y
                        };
                        let _ = main_window.set_position(PhysicalPosition::new(x, y_after_padding));
                    } else {
                        let percent_of_w = 0.72; // 72% of weidth
                        let percent_of_h = 0.55; // 55% of the height
                        let new_x = monitor_pos.x + (monitor_width * percent_of_w) as i32;
                        let optimal_y_padding =
                            if cfg!(any(target_os = "macos", target_os = "linux")) {
                                10
                            } else {
                                (percent_of_h * monitor_height) as i32
                            };
                        let _ = main_window.set_position(PhysicalPosition::new(
                            new_x,
                            monitor_pos.y + optimal_y_padding as i32,
                        ));
                    }
                }
            }
            _ => eprintln!("Could not get mouse position"),
        }

        let _ = main_window.set_visible_on_all_workspaces(true);
        let _ = main_window.show();
        let _ = main_window.set_focus();
    }
}

fn find_target_monitor(main_window: &WebviewWindow, mouse_x: i32, mouse_y: i32) -> Option<Monitor> {
    let monitors = main_window.available_monitors().unwrap_or_default();
    let target_monitor = monitors.into_iter().find(|m| {
        let m_pos = m.position();
        let m_size = m.size();
        // for multimonitor setup check which monitor the user is active
        mouse_x >= m_pos.x
            && mouse_x <= (m_pos.x + m_size.width as i32)
            && mouse_y >= m_pos.y
            && mouse_y <= (m_pos.y + m_size.height as i32)
    });
    return target_monitor;
}
