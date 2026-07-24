use mouse_position::mouse_position::Mouse;
use tauri::{AppHandle, Manager, PhysicalPosition};

// Window position calculation
pub fn window_pos(app: AppHandle, is_shortcut: bool) {
    if let Some(main_window) = app.get_webview_window("main") {
        let pos = Mouse::get_mouse_position();
        match pos {
            Mouse::Position { x, y } => {
                if is_shortcut {
                    let _ = main_window.set_position(PhysicalPosition::new(x, y));
                } else {
                    let monitors = main_window.available_monitors().unwrap_or_default();
                    let target_monitor = monitors.into_iter().find(|m| {
                        let m_pos = m.position();
                        let m_size = m.size();
                        x >= m_pos.x
                            && x <= (m_pos.x + m_size.width as i32)
                            && y >= m_pos.y
                            && y <= (m_pos.y + m_size.height as i32)
                    });

                    if let Some(monitor) = target_monitor {
                        let m_pos = monitor.position();
                        let m_size = monitor.size();
                        let new_x = m_pos.x + (m_size.width as f64 * 0.72) as i32;
                        let _ =
                            main_window.set_position(PhysicalPosition::new(new_x, m_pos.y + 10));
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
