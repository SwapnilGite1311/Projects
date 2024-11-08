import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;

public class TerminalEmulator extends JFrame implements KeyListener {
    JTextArea terminalArea;
    String prompt = "$ ";  // Simulate a Linux-like prompt

    public TerminalEmulator() {
        // 
        setTitle("Cygwin64-like Terminal Emulator");
        setLayout(new BorderLayout());

        // creating JtextArea for input and output
        terminalArea = new JTextArea(30, 70);
        terminalArea.setBackground(Color.BLACK);
        terminalArea.setForeground(Color.GREEN);
        terminalArea.setCaretColor(Color.GREEN);  // Set the caret (cursor) color to green
        terminalArea.setFont(new Font("Monospaced", Font.PLAIN, 14));  // Terminal-like font
        terminalArea.setEditable(true);  // Input allowed

        // Add the 1st prompt
        terminalArea.setText(prompt);
        terminalArea.addKeyListener(this);  // Add key listener to detect Enter key

        // Add the terminal area 
        JScrollPane scrollPane = new JScrollPane(terminalArea);
        add(scrollPane, BorderLayout.CENTER);

        // Set close operation 
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 500);
        setVisible(true);
    }

    // KeyListener methods
    public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_ENTER) {
            e.consume();  
            executeCommand();  // to execute command when the enter button is pressed
        }
    }

    public void keyReleased(KeyEvent e) {}
    public void keyTyped(KeyEvent e) {}

    // Method to execute the command
    private void executeCommand() {
        try {
            // Get the command from the user
            String text = terminalArea.getText();
            int lastPromptIndex = text.lastIndexOf(prompt);
            String command = text.substring(lastPromptIndex + prompt.length()).trim();

            if (command.isEmpty()) {
                terminalArea.append("\n" + prompt);  // Add new prompt if command is empty
                return;
            }

            // Handle basic commands
            switch (command) {
                case "date":
                    appendOutput("Current date and time: " + new java.util.Date());
                    break;
                case "cal":
                    appendOutput("Calendar command not implemented in this emulator.");
                    break;
                case "clear":
                    terminalArea.setText("");  // Clear the terminal
                    terminalArea.append(prompt);  // Add prompt back
                    break;
                case "tty":
                    appendOutput("This is a simulated terminal.");
                    break;
                case "script":
                    appendOutput("Script command not implemented in this emulator.");
                    break;
                case "man":
                    appendOutput("Manual pages not implemented. Usage: <command>");
                    break;
                default:
                    // Detect OS type and map command for Windows or use shell on Unix systems
                    String os = System.getProperty("os.name").toLowerCase();
                    String[] fullCommand;

                    if (os.contains("win")) {
                        // Map common Linux commands to their Windows equivalents
                        if (command.equals("ls")) {
                            command = "dir";  // Convert 'ls' to 'dir' on Windows
                        }
                        fullCommand = new String[] { "cmd", "/c", command };
                    } else {
                        fullCommand = new String[] { "/bin/sh", "-c", command };
                    }

                    // Execute the command
                    Process process = Runtime.getRuntime().exec(fullCommand);

                    // Capture the output and error streams
                    BufferedReader outputReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                    BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

                    StringBuilder output = new StringBuilder();
                    String line;

                    // Read the command output
                    while ((line = outputReader.readLine()) != null) {
                        output.append(line).append("\n");
                    }

                    // Read error(in case of an error)
                    while ((line = errorReader.readLine()) != null) {
                        output.append("ERROR: ").append(line).append("\n");
                    }

                    // Display the output or error in the terminal
                    appendOutput(output.toString());
            }

        } catch (IOException ex) {
            appendOutput("Error executing command: " + ex.getMessage());
        }
    }

    // Method to append output to the terminal area
    private void appendOutput(String output) {
        terminalArea.append("\n" + output);
        terminalArea.append("\n" + prompt);  // Add a new prompt at the end
        terminalArea.setCaretPosition(terminalArea.getDocument().getLength());  // Scroll to the bottom
    }

    public static void main(String[] args) {
        new TerminalEmulator();
    }
}
