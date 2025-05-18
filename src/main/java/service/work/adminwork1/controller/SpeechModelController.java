package service.work.adminwork1.controller;

import service.work.adminwork1.model.SpeechModel;
import service.work.adminwork1.service.SpeechModelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
@CrossOrigin(origins = "*")
public class SpeechModelController {
    private static final Logger logger = LoggerFactory.getLogger(SpeechModelController.class);
    
    private final SpeechModelService service;

    @Autowired
    public SpeechModelController(SpeechModelService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SpeechModel>> getAllModels() {
        logger.info("Fetching all models");
        try {
            List<SpeechModel> models = service.getAllModels();
            return ResponseEntity.ok(models);
        } catch (Exception e) {
            logger.error("Error fetching all models", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<SpeechModel> getModelByName(@PathVariable String name) {
        logger.info("Fetching model by name: {}", name);
        try {
            return service.getModelByName(name)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error fetching model by name: {}", name, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<SpeechModel> createModel(@RequestBody SpeechModel model) {
        logger.info("Creating new model: {}", model.getName());
        try {
            SpeechModel createdModel = service.createModel(model);
            return ResponseEntity.ok(createdModel);
        } catch (Exception e) {
            logger.error("Error creating model: {}", model.getName(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpeechModel> updateModel(@PathVariable Long id, @RequestBody SpeechModel model) {
        logger.info("Updating model with id: {}", id);
        try {
            SpeechModel updatedModel = service.updateModel(id, model);
            return ResponseEntity.ok(updatedModel);
        } catch (RuntimeException e) {
            logger.error("Error updating model with id: {}", id, e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Unexpected error updating model with id: {}", id, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/update-all")
    public ResponseEntity<List<SpeechModel>> updateAllModels(@RequestBody List<SpeechModel> models) {
        logger.info("Updating all models");
        try {
            List<SpeechModel> updatedModels = service.updateAllModels(models);
            return ResponseEntity.ok(updatedModels);
        } catch (Exception e) {
            logger.error("Error updating all models", e);
            return ResponseEntity.internalServerError().build();
        }
    }

} 