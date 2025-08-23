import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormsScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    const formData = { name, description, tags };
    console.log("Form Data:", formData);

    // Example: Navigate back or to another screen
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>

      {/* Item Name */}
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />

      {/* Item Description */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Item Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      {/* Tags */}
      <View style={styles.tagRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add tag"
          value={tagInput}
          onChangeText={setTagInput}
          onSubmitEditing={addTag}
        />
        <TouchableOpacity style={styles.addTagBtn} onPress={addTag}>
          <Text style={styles.addTagText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Display Tags */}
      <FlatList
        data={tags}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagList}
        renderItem={({ item }) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => removeTag(item)}>
              <Text style={styles.removeTag}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save Item</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e293b",
  },
  input: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#1e293b",
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addTagBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addTagText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    alignItems: "center",
  },
  tagText: {
    fontSize: 14,
    color: "#1e293b",
  },
  removeTag: {
    fontSize: 16,
    color: "#ef4444",
    marginLeft: 6,
  },
  submitBtn: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backBtn: {
    alignItems: "center",
  },
  backText: {
    fontSize: 14,
    color: "#64748b",
  },
});
